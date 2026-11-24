import Emitter from "../class/emitter.js"

import Player from "./model/player.js"
import Battle from "./model/battle.js"
import Room from "./model/room.js"

import ScriptModule from "./script.js"
import InteractionModule from "./interaction.js"

import Factory from "./factory.js"

class Game extends Emitter {
    id = null 
    name = "Unnamed Game"
    description = "A game with no description"
    version = 0
    startRoom = "NULL"
    room = [
        new Room( {id:"NULL",type:"room",name:"NULL Room",description:"NULL Room"} )
    ]

    player = null
    battle = null

    factory = null

    script = null
    action = null

    new = true

    byId = {
            NULL:this.room[0]
    }

    storedState = null

    constructor(API, saveData) {
        super()
        window.dbg("Game", "Constructing")

        this.storedState = saveData

        this.factory = new Factory()
        this.factory.on("instanced", this.register.bind(this))

        this.id = saveData.id || crypto.randomUUID()

        this.name = saveData.name ?? this.name
        this.description = saveData.description ?? this.description
        this.version = saveData.version ?? this.version
        this.startRoom = saveData.startRoom ?? this.startRoom

        this.script = new ScriptModule(API,saveData.script)
        this.script.on("errored", (msg) => this.emit("errored",msg))

        //Needs to run after scriptmodule in case objects are scripted
        saveData.content.room.map((room) => this.create(room)) 

        this.action = new InteractionModule(API)
        this.action.load(saveData.content.command)
         this.action.on("output", (...arg) =>
            this.emit("actionOutput", this, ...arg)
        )


        this.battle = new Battle(saveData.battle)
        this.player = new Player(saveData.player)

        this.player.content = this.player.content.map((obj) => this.create(obj))

        this.new = "new" in saveData ? false : true

        if (this.new)
            this.player.room = this.startRoom
    }

    start() {
        this.script.start()
    }

    get(id) {
        const foundObject = this.byId[id]
        if (!foundObject) {
            throw new Error(`Tried getting an invalid object with id #${id}`)
        }
        return foundObject
    }

    handle(input, silent = false) {
        return this.action.handle(input, silent)
    }

    register(object) {
        //window.dbg("StoreModule",`Registering ${object.name}`)
        this.byId[object.id] = object

        if (object.type === "room") this.room.push(object)

        if (object.script) this.script.runObjectScript(object)

        //Bubble any event from objects upward
        object.on("*", (event, target, ...args) =>
            this.emit(event, target, ...args)
        )
    }

    create(objectState) {
        if (objectState.id in this.byId) {
            console.warn(
                `Collision warning: #${objectState.id} already exists, this will cause an override`
            )
        }

        const newObject = this.factory.instance(objectState)

        return newObject
    }

    //TODO: Lifted this from room, fix it
    patch(data) {
        window.dbg("StoreModule", "Patching load data")
        const patchedId = {}
        const prePatchedRoom = data.room.map((room) => {
            const id = this.factory.unid()
            patchedId[room.id] = id
            console.log(`Stored room id #${room.id} as room id #${id}`)
            return { ...room, ...{ id } }
        })
        console.log("pre", prePatchedRoom)

        const patchedRoom = prePatchedRoom.map((room) => {
            const patchedContent = room.content.map((exit) => {
                if (exit.type !== "exit") return exit
                console.log(
                    `Patching exit "${exit.name}" with target #${exit.target} to #${patchedId[exit.target]}`
                )
                return { ...exit, ...{ target: patchedId[exit.target] } }
            })
            return { ...room, ...{ content: patchedContent } }
        })
        console.log("patched:", patchedRoom)
        const instancedRoom = patchedRoom.map((r) => this.create(r))
        console.log(`Done, patched in ${patchedRoom.length} rooms:`)
        patchedRoom.map((room) => console.log(`#${room.id}:${room.name}`))
        return instancedRoom
    }

    save() {
        const out = {
            id:this.id,
            type:"game",
            name:this.name,
            description:this.description,
            startRoom:this.startRoom,
            script:this.script.source,
            player: this.player,
            content:{
                room: this.room.filter((e) => e.id !== "NULL"),
            },
            battle: {
                target: this.battle.target ? this.battle.target.id : null,
            },
            new: false,
        }

        return out
    }
}

export default Game
