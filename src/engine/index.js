import Emitter from './class/emitter'
import Game from "./game"

import StorageModule from './module/storage'
import InteractionModule from './module/interaction'
import CombatModule from './module/combat'
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
    action  = null 
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
        this.action = new InteractionModule(this.API)

        //TODO: Planned obsolete: In future, we won't be loading content from disk anymore aside from base content
        this.content = new ContentModule(
            [baseContentConstructor(this.API)].concat(
                this.createContent(contentPackList)
            ))

        this.ui.on("commandHandled", (e)=> this.handle(e))
        this.action.on('output', (...arg) => this.ui.print(...arg))
       
        this.start()
    }

    start(gameName="Main Menu") {
        console.log(`%cEngine starting ${gameName}`,"color:yellow;")
        this.ui.clear()
        
        const game = this.content.createGame(gameName)

        this.action.load(game.command)

        this.game = new Game(this.API,game)
        this.game.start()

        this.game.on("*",(event,target,...args)=>{

            if (["object_ticked","object_registered"].indexOf(event) === -1)
                console.log(`%c Store emitted ${event} on ${target.name}`,'color:yellow;')

            switch (event){
                case "echo":
                    if (target.type === "room" && target.id !== this.game.player.room)
                        break 
                    if (target.type !== "room" && target.room !== this.game.player.room)
                        break 
                    this.print(...args)
                    break
                case "object_registered":
                    this.onObjectRegistered(target)
                    break
            }
            
        } )

        this.API.handle("look",true)

        if (this.tickerId) {
            window.dbg('Engine', 'Clearing existing ticker')
            window.clearInterval(this.tickerId)
        }

        this.tickerId = window.setInterval(() => this.tick(), 5000)
    }

    createContent(contentPackList){
        return contentPackList.map((e) => typeof e === "function" ? e(this.API) : e)
    }

    OLD_constructor(contentPackList) {
        window.dbg('Engine', 'Constructing')

        this.util = util

        this.store = new StoreModule()

        this.API = APIConstructor(this)

        this.action = new InteractionModule(this.API)
        this.combat = new CombatModule(this.API)
        this.script = new ScriptModule(this.API)
        this.storage = new StorageModule(this.store)

        this.content = new ContentModule(
            contentPackList.map((packConstructor) => 
                typeof packConstructor === "function" ? packConstructor(this.API) : packConstructor)
            .concat(baseContentConstructor(this.API))
        )

        //Print output from the interaction module
        this.action.on('output', (...arg) => this.print(...arg))

        this.store.on("*",(event,target,...args)=>{

            if (["object_ticked","object_registered"].indexOf(event) === -1)
                console.log(`%c Store emitted ${event} on ${target.name}`,'color:yellow;')

            switch (event){
                case "object_registered":
                    this.onObjectRegistered(target)
                    break
            }
            
        } )
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
                name: name+" Pack",
                description:name+" Pack"
            },
            game:{
                name,
                depend:[name+" Pack"],
                description:"New Game",
                startRoom:"InitRoom"
            }
        }

        this.content.loadPack(newGame)
        this.start(name)
    }
    onObjectRegistered(object){
        if (object.script)
            this.script.loadObjectScript(object)
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
        try {
            return this.action.handle(input, silent)
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
