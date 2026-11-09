import Emitter from './class/emitter'

import StorageModule from './module/storage'
import InteractionModule from './module/interaction'
import CombatModule from './module/combat'
import ContentModule from './module/content'
import StoreModule from './module/store'
import ScriptModule from './module/script'

import baseContentConstructor from './content'

import APIConstructor from './api'

import util from '../util'

/**
 * Main engine, needs a store,content and commands.
 */
class Engine extends Emitter {
    inputPrompt = null
    tickerId = null

    constructor(contentPackList) {
        super()
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

    start(gamePackName="Base") {
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
        const channelEcho = (_room,...args)=> this.echo(args)

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

    onObjectRegistered(object){
        if (object.script)
            this.script.loadObjectScript(object)
    }

    echo(...arg) {
        this.print(...arg)
    }

    print(raw, isInput = false) {
        this.store.ui.print(raw, isInput)
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
        this.store.ui.printError(err)
    }

    handle(input, silent = false) {
        try {
            return this.action.handle(input, silent)
        } catch (error) {
            this.printError(error)
        }
        return false
    }

    new(){
        window.dbg("--------","Creating new game")
        this.store.ui.clear()
        const newpack = this.API.createPack()
        this.content.contentPackSet.push(newpack)
        this.start(newpack.info.name)
    }

    tick() {
        try {
            this.store.world.room.map((room) => room.tick(this.API))
            this.store.player.tick(this.API)
        } catch (error) {
            this.printError(error)
        }
    }
}

export default Engine
