import Emitter from "./class/emitter"
import Game from "./game"

import StorageModule from "./module/storage"
import CombatModule from "./module/combat"

import UIModule from "./module/ui"

import baseContentConstructor from "./content"

import APIConstructor from "./api"

import util from "../util"

/**
 * Main engine
 */
class Engine extends Emitter {
    tickerId = null

    util = null

    API = null

    combat = null
    storage = null

    game = null

    constructor() {
        super()
        window.dbg("Engine", "Constructing")

        this.API = APIConstructor(this)
        this.API.util = util

        this.ui = new UIModule()
        this.storage = new StorageModule( [baseContentConstructor(this.API)] )

        this.combat = new CombatModule(this.API)

        this.ui.on("commandHandled", (command,silent) => this.handle(command,silent) )

        this.start()
    }

    start(id = "BASE",state=null) {
        window.dbg("Engine",`starting ${id}`)
        this.ui.clear()

        const defaultGameState = this.storage.get(id)

        if (!defaultGameState){
            this.start("BASE")
            this.ui.print({type:"div",className:"bold text-danger p-4",content:`Tried loading an invalid game '${id}' `})
            console.warn(`Tried loading in valid game: "${id}"`)
            return
        }

        const activeId = id.endsWith("#A") ? id : id+"#A"
        const newGameState = this.createGame(defaultGameState,activeId)

        this.game = new Game(this.API, newGameState)
        
        if (id !== "BASE")
            this.storage.save(this.game.save(),true)

        this.game.on("actionOutput", (_target, message) =>
            this.print(message, false)
        )

        this.game.on("errored",(msg) => this.printScriptError(msg) )

        this.game.on("object_viewed", (object) =>{
            const msg = this.ui.printer.present(object)
            object.emit("object_presented",msg)
        })

        this.game.start()

        this.API.handle("look", true)

        if (this.tickerId) {
            window.dbg("Engine", "Clearing existing ticker")
            window.clearInterval(this.tickerId)
        }

        //Listen to any echoes in the current room
        const channelEcho = (_room, ...args) => this.echo(...args)

        //Note: Store gets reset on load, this does not stack
        this.game.get(this.game.player.room).on("echo", channelEcho)

        //Listen to any echoes in any further room explored
        this.game.player.on("moved", (_player, next, prev) => {
            this.game.get(prev.id).off("echo", channelEcho)
            this.game.get(next.id).on("echo", channelEcho)
        })

        this.storage.removeSaveListener()

        if (id !== "BASE") {
            this.storage.createSaveListener(this.game)
        }

        //Cancel any fight when the player dies
        this.API.player().on("died", () => this.combat.endFight())

        this.combat.attemptResume(this.game.battle)

        this.tickerId = window.setInterval(() => this.tick(), 5000)
    }


    new(name = "New Game") {
        window.dbg("Engine","!!! Creating new game")

        const newGame = {
            id: crypto.randomUUID(),
            content:{
                    room: [
                    {
                        id: "InitRoom",
                        type: "room",
                        name: "Empty Room",
                        description: "Empty Room",
                    },
                    ]
            },

            type: "game",
            name,
            description: name + " Pack",
            version:0,
            startRoom: "InitRoom",
            script:"API.print('Hello World!')"
        }

        this.storage.import(newGame)
        this.start(newGame.id)
        return newGame
    }

    createGame(defaultGameState,id=null) {
        window.dbg("Engine",`Creating game "${defaultGameState.id}"`)
        const base = this.storage.get("BASE")
    
        const newGame = {...defaultGameState}

        newGame.content.command = {...base.content.command,...newGame.content.command}


        if (id)
            newGame.id = id

        console.log(newGame)
        return newGame
    }

    save() {
        const state = this.game.save()
        this.storage.save(state)
        return state
    }

    echo(...arg) {
        this.print(...arg)
    }

    print(raw, isInput = false) {
        return this.ui.print(raw, isInput)
    }

    clear() {
        this.store.ui.clear()
    }

    reset() {
        this.storage.disableSaving = true
        localStorage.clear()
        window.location.reload()
    }

    printScriptError(err){
        this.ui.print({type:"span",className:"bold",content:"Script error:"})
        this.ui.print({type:"span",className:"bold text-danger",content:err.stack})
        this.ui.print({type:"span",content:this.game.script.source})
    }
    printError(err) {
        this.ui.printError(err)
    }

    handle(input, silent = false) {
        if (!this.game) return "No game loaded"

        try {
            return this.game.handle(input, silent)
        } catch (error) {
            this.printError(error)
        }
        return false
    }

    tick() {
        try {
            this.game.room.map((room) => room.tick(this.API))
            this.game.player.tick(this.API)
        } catch (error) {
            this.printError(error)
        }
    }
}

export default Engine
