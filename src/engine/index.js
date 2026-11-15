import Emitter from './class/emitter'
import Game from "./game"

import StorageModule from './module/storage'
import ContentModule from './module/content'

import UIModule from './module/ui'

import baseContentConstructor from './content'

import APIConstructor from './api'

import util from '../util'

/**
 * Main engine, needs a store,content and commands.
 */
class Engine extends Emitter {
    tickerId = null

    util = null 

    API = null 

    store   = null 
    combat  = null
    storage = null 
    content = null 

    game = null 
    
    constructor(contentPackList){
        super()
        window.dbg('Engine', 'Constructing')

        this.API = APIConstructor(this)
        this.API.util = util

        this.ui = new UIModule()
        this.storage = new StorageModule()

        //TODO: Planned obsolete: In future, we won't be loading content from disk anymore aside from base content
        this.content = new ContentModule(
            [baseContentConstructor(this.API)].concat(
                this.createContent(contentPackList)
            ))

        this.ui.on("commandHandled", (e)=> this.handle(e))
 
        this.start()
    }

    start(gameName="Base") {
        console.log(`%cEngine starting ${gameName}`,"color:yellow;")
        this.ui.clear()
        
        const game = this.content.createGame(gameName)
        const savedGame = this.storage.get(gameName)
        const restoredGame = {...game,...savedGame}    
        this.game = new Game(this.API,restoredGame)

        this.game.on("actionOutput",(_target,message) => this.print(message,false) )

        this.game.start()

        this.API.handle("look",true)

        if (this.tickerId) {
            window.dbg('Engine', 'Clearing existing ticker')
            window.clearInterval(this.tickerId)
        }

         //Listen to any echoes in the current room
        const channelEcho = (_room,...args)=> this.echo(...args)

        //Note: Store gets reset on load, this does not stack
        this.game.get(this.game.player.room).on('echo', channelEcho)

        //Listen to any echoes in any further room explored
        this.game.player.on('moved', (_player,next, prev) => {
            this.game.get(prev.id).off('echo', channelEcho)
            this.game.get(next.id).on('echo', channelEcho)
        })

        if (gameName !== "Base")
            this.storage.createSaveListener(gameName,this.game)

        this.tickerId = window.setInterval(() => this.tick(), 5000)
    }

    
    createContent(contentPackList){
        return contentPackList.map((e) => typeof e === "function" ? e(this.API) : e)
    }


    OLD_start(gamePackName="Base") {
        window.dbg('Engine', `Starting ${gamePackName}`)

        //Reset any content actively loaded in
        //Always load the base content pack, provides a default mode
        this.content.reset()
        this.action.reset()
        this.script.reset()

        if (gamePackName !== "Base"){
            //Enable saving if we're NOT in base mode
            this.storage.addSaveListener(gamePackName,this.store)

            //Load content from base pack for default functionality
            this.content.loadPack("Base")
        }
        
        const gamePack = this.content.loadPack(gamePackName)

        this.action.load(this.content.get('command'))

        this.store.load(
            this.storage.load(gamePack.info) ||
                this.content.newGame(gamePack.info)
        )

        this.script.load(gamePack.script)

        //Listen to any echoes in the current room
        const channelEcho = (_room,...args)=> this.echo(...args)

        //Note: Store gets reset on load, this does not stack
        this.store.get(this.store.player.room).on('echo', channelEcho)

        //Listen to any echoes in any further room explored
        this.store.player.on('moved', (_player,next, prev) => {
            this.store.get(prev.id).off('echo', channelEcho)
            this.store.get(next.id).on('echo', channelEcho)
        })

        this.handle('look', true)

        //Resume an active battle (if applicable)
        this.combat.attemptResume(this.store.battle)

        //Cancel any fight when the player dies
        this.API.player().on('died', () => this.combat.endFight())

        //Trigger any missed "player entered room" scripts
        const plyRoom = this.store.get(this.store.player.room)
        plyRoom.emit('player_entered',plyRoom,null)

        if (this.tickerId) {
            window.dbg('Engine', 'Clearing existing ticker')
            window.clearInterval(this.tickerId)
        }

        this.tickerId = window.setInterval(() => this.tick(), 5000)
    }

    new(name="New Game"){
        let realName = name 

        if (this.content.game[realName]) {
            let next = 1
            realName = `${name} (${next})`
            while (this.content.game[realName]) {
                next++
                realName = `${name} (${next})`
            }
        }

        const newGame = {
            room:[
                {
                    id:"InitRoom",
                    type:"room",
                    name:"Empty Room",
                    description:"Empty Room"
                }
            ],
            info:{
                type:"game",
                name:realName,
                description:name+" Pack",
                startRoom:"InitRoom"
            }
        }

        this.content.loadPack(newGame)
        this.start(realName)
    }

    save(){
        const state = this.game.save()
        this.storage.save(this.game.storedGame.info.name,state)
        return state
    }

    echo(...arg) {
        this.print(...arg)
    }

    print(raw, isInput = false) {
        this.ui.print(raw, isInput)
    }

    clear() {
        this.store.ui.clear()
    }

    reset() {
        this.storage.disableSaving = true
        this.storage.nuke()
        window.location.reload()
    }

    printError(err) {
        this.ui.printError(err)
    }

    handle(input, silent = false) {
        if (! this.game)
            return "No game loaded"

        try {
            return this.game.handle(input, silent)
        } catch (error) {
            this.printError(error)
        }
        return false
    }

    fromFile(){
        this.API.handle("gimp",true)
    }

    tick() {
        try {
            this.game.world.room.map((room) => room.tick(this.API))
            this.game.player.tick(this.API)
        } catch (error) {
            this.printError(error)
        }
    }
}

export default Engine
