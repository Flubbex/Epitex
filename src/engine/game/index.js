import Emitter from '../class/emitter.js'

import Player from './model/player.js'
import World from './model/world.js'
import Battle from './model/battle.js'

import Factory from './factory.js'
import ScriptModule from './script.js'

class Game extends Emitter {
    player = null
    world = null
    battle = null

    factory = null

    script = null 

    new = true

    byId = {}

    storedGame = null

    gamePackInfo = null 

    constructor(API,saveData) {
        super()
        window.dbg('Game', 'Constructing')

        this.factory = new Factory()
        this.script = new ScriptModule(API)

        this.factory.on('instanced', this.register.bind(this))

        this.storedGame = saveData

        this.world = new World()
        
        if (saveData.room)
            saveData.room.map((room) => this.create(room))

        this.battle = new Battle(saveData.battle)
        this.player = new Player(saveData.player)

        this.player.content = this.player.content.map((obj) => this.create(obj))

        this.new = 'new' in saveData ? false : true

        this.gamePackInfo = saveData.gamePackInfo

        if (this.new)
            if (saveData.startRoom)
                this.player.room = saveData.startRoom
            else
                console.warn(
                    "Store doesn't know where to start player on a new game"
                )
    }

    start(){
        if (this.storedGame.script)
            this.script.load(this.storedGame.script)
    }

    get(id) {
        const foundObject = this.byId[id]
        if (!foundObject) {
            throw new Error(`Tried getting an invalid object with id #${id}`)
        }
        return foundObject
    }

    register(object) {
        //window.dbg("StoreModule",`Registering ${object.name}`)
        this.byId[object.id] = object

        if (object.type === 'room') this.world.room.push(object)

        if (object.script)
            this.script.loadObjectScript(object)

        //Bubble any event from objects upward
        object.on("*",(event,target,...args) => this.emit(event,target,...args))
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
        window.dbg('StoreModule', 'Patching load data')
        const patchedId = {}
        const prePatchedRoom = data.room.map((room) => {
            const id = this.factory.unid()
            patchedId[room.id] = id
            console.log(`Stored room id #${room.id} as room id #${id}`)
            return { ...room, ...{ id } }
        })
        console.log('pre', prePatchedRoom)

        const patchedRoom = prePatchedRoom.map((room) => {
            const patchedContent = room.content.map((exit) => {
                if (exit.type !== 'exit') return exit
                console.log(
                    `Patching exit "${exit.name}" with target #${exit.target} to #${patchedId[exit.target]}`
                )
                return { ...exit, ...{ target: patchedId[exit.target] } }
            })
            return { ...room, ...{ content: patchedContent } }
        })
        console.log('patched:', patchedRoom)
        const instancedRoom = patchedRoom.map((r) => this.create(r))
        console.log(`Done, patched in ${patchedRoom.length} rooms:`)
        patchedRoom.map((room) => console.log(`#${room.id}:${room.name}`))
        return instancedRoom
    }

    save() {
        return {
            world: this.world,
            player: this.player,
            battle: {
                target: this.battle.target ? this.battle.target.id : null,
            },
            new: this.new,
        }
    }
}

export default Game
