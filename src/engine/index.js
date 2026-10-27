import Emitter from "./class/emitter"

import StorageModule        from "./module/storage"
import InteractionModule    from "./module/interaction"
import EventModule          from "./module/event"
import CombatModule         from "./module/combat"
import ContentModule        from "./module/content"
import StoreModule          from "./module/store"
import ScriptModule         from "./module/script"

import baseContentConstructor from "./content"

import APIConstructor from "./api"

import util           from "../util"

/**
 * Main engine, needs a store,content and commands.
 */
class Engine extends Emitter {

    inputPrompt = null 
    tickerId = null 

    constructor(contentPackList) {
        super()
        window.dbg("Engine", "Constructing")

        this.util = util 

        this.API        = APIConstructor(this)
        
        this.store      = new StoreModule()
        this.action     = new InteractionModule(this.API)
        this.combat     = new CombatModule(this.API)
        this.event      = new EventModule(this.API)
        this.script     = new ScriptModule(this.API)
        
        this.storage    = new StorageModule(this.store)

        this.content    = new ContentModule(contentPackList.map((packConstructor) => packConstructor(this.API) ))

        //Print output from the interaction module
        this.action.on("output", (...arg) => this.print(...arg))

    }
    start(gamePackName) {

        //Reset any content actively loaded in
        //Always load the base content pack, provides a default mode
        this.content.reset()
        this.action.reset()

        const baseContentPack = baseContentConstructor(this.API)
        this.content.load( baseContentPack )
        
        //If provided, load the game pack on top of the base content
        if (gamePackName) {

             window.dbg("Engine", `Starting ${gamePackName}`)

            const gamePack = this.content.loadPack( gamePackName )

            this.action.load( this.content.get("command") )
            
            this.storage.saveName = gamePack.info.name
            this.storage.addSaveListener(this.store)

            this.store.load( this.storage.load(gamePack.info) || this.content.newGame(gamePack.info) )
        }else {
            //Notice: We don't enable saving in default mode to prevent shenanigans
            window.dbg("Engine", `Starting in default mode`)
            this.action.load( this.content.get("command") )
            this.store.load(  this.content.newGame( baseContentPack.info) )
        }

        //Listen to any event passed to the master room
        this.store.get("NULLED").on("event", this.event.createHandler(this) )

        //Listen to any echoes in the current room
        this.echo = this.echo.bind(this)
        this.store.get(this.store.player.room).on("echo", this.echo)

        //Listen to any echoes in any further room explored
        this.store.player.on("moved", (next, prev) => {
            this.store.get(prev.id).off("echo", this.echo)
            this.store.get(next.id).on("echo", this.echo)
        })

        this.handle("look", true)
        
        //Resume an active battle (if applicable)
        this.combat.attemptResume(this.store.battle)
        
        //Cancel any fight when the player dies
        this.API.player().on("died",()=>this.combat.endFight())

         //Trigger any missed "player entered room" events
        const plyRoom = this.store.get(this.store.player.room)
        if (plyRoom.event["playerEntered"])
            plyRoom.emit("event", plyRoom.event["playerEntered"], plyRoom, this.store.player)
        
         if (this.tickerId) {
            window.dbg("Engine", "Clearing existing ticker")
            window.clearInterval(this.tickerId)
        }
        
        this.tickerId = window.setInterval(() => this.tick(), 5000)
    }
    
    echo(...arg) {
        this.print(...arg)
    }

    print(raw, isInput = false) {
         this.store.ui.print(raw,isInput)
    }

    clear() {
         this.store.ui.clear()
    }

    reset() {
        this.storage.disableSaving = true
        this.storage.nuke()
        window.location.reload()
    }

    printError(err){
        this.store.ui.printError(err)
    }

    handle(input, silent = false) {
        try {
            return this.action.handle(input, silent)
        } catch (error) { this.printError(error) }
        return false
    }


    tick() {
        try {
            this.store.world.room.map((room) => room.tick(this.API))
            this.store.player.tick(this.API)
        } catch (error) { this.printError(error) }
    }
}

export default Engine