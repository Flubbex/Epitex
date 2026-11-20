import Emitter from "./class/emitter"
import Game from "./game"

import StorageModule from "./module/storage"
import ContentModule from "./module/content"
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
    content = null

    game = null

    constructor() {
        super()
        window.dbg("Engine", "Constructing")

        this.API = APIConstructor(this)
        this.API.util = util

        this.ui = new UIModule()
        this.storage = new StorageModule( [baseContentConstructor(this.API)] )

        const allContent = this.storage.list("game").concat(this.storage.list("library"))
        this.content = new ContentModule(allContent)

        this.combat = new CombatModule(this.API)

        this.ui.on("commandHandled", (e) => this.handle(e))

        this.start()
    }

    start(gameName = "Base") {
        console.log(`%cEngine starting ${gameName}`, "color:yellow;")
        this.ui.clear()

        if (!this.content.gameExists(gameName)){
            this.start("Base")
            this.ui.print({type:"div",className:"bold text-danger p-4",content:`Tried loading an invalid game '${gameName}' `})
            console.warn(`Tried loading in valid game: "${gameName}"`)
            return
        }
        const game = this.content.createGame(gameName)
        const savedGame = this.storage.get("save",game.id)

        console.log("Overriding")
        console.log(game)
        console.log("With")
        console.log(savedGame)

        const restoredGame = { ...game, ...savedGame }
        this.game = new Game(this.API, restoredGame)

        this.game.on("actionOutput", (_target, message) =>
            this.print(message, false)
        )

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

        if (gameName !== "Base") {
            this.storage.createSaveListener("save", this.game)
        }

        //Cancel any fight when the player dies
        this.API.player().on("died", () => this.combat.endFight())

        this.combat.attemptResume(this.game.battle)

        this.tickerId = window.setInterval(() => this.tick(), 5000)
    }

    createContent(contentPackList) {
        return contentPackList.map((e) =>
            typeof e === "function" ? e(this.API) : e
        )
    }

    new(name = "New Game") {
        console.log("%cCreating new game","color:orange")
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
            id: Math.floor(Math.random()*1000),
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
            info: {
                type: "game",
                name: realName,
                description: name + " Pack",
                startRoom: "InitRoom",
            },
        }

        this.storage.save("game",newGame)
        this.content.loadPack(newGame)
        this.start(realName)
    }

    save() {
        const state = this.game.save()
        this.storage.save(this.game.id, state)
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

    fromFile() {
        this.API.handle("gimp", true)
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
