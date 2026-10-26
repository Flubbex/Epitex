import Player from "./model/player.js"
import World from "./model/world.js"
import UI from "./model/ui.js"
import Battle from "./model/battle.js"

import Factory from "./factory.js"

class StoreModule {
    player = null
    world = null
    ui = null
    battle = null 

    factory = null 

    new = true

    byId = {}

    constructor(){
        window.dbg("StoreModule","Constructing")

        this.factory = new Factory()

        this.ui = new UI()
    }

    get(id){
       const foundObject = this.byId[id]
       if (!foundObject){
            throw new Error(`Tried getting an invalid object with id #${id}`)
       }
       return foundObject
    }

    create(objectState){
        const newObject = this.factory.instance(objectState)
        
        if (newObject.id in this.byId) {
            console.warn(`Collision warning: #${newObject.id} already exists as ${this.get(newObject.id).name}, overriding`)
        }
        this.byId[newObject.id] = newObject

        if (newObject.id !== "NULLED") 
            newObject.on("*",(...e)=>this.get("NULLED").emit(...e))

        return newObject
    }

    load(saveData){
        window.dbg("StoreModule","Loading")

        this.byId = {}

        const worldData = {...saveData.world}
        worldData.room = worldData.room.map((room) => this.create(room))

        this.world = new World(worldData)
        this.battle =new Battle(saveData.battle) 
        this.player = new Player(saveData.player)
        
        this.player.content = this.player.content.map((obj) => this.factory.instance(obj) )
        
        this.new = "new" in saveData ? false : true

        this.gamePackInfo = saveData.gamePackInfo


        //TODO: UI is connected to the react state so this is.. ugly. Fix it.
        for (var prop in saveData.ui)
            this.ui[prop] = saveData.ui[prop]
         
        if (this.new) 
            if (this.gamePackInfo?.startRoom)
                this.player.room = this.gamePackInfo.startRoom
            else
                console.warn("Store doesn't know where to start player on a new game")
        
    }

    //TODO: Lifted this from room, fix it
    patch (data) {
        window.dbg("StoreModule","Patching load data")
        const patchedId = {}
        const prePatchedRoom = data.room.map((room) => {
            const id = this.factory.unid()
            patchedId[room.id] = id
            console.log(`Stored room id #${room.id} as room id #${id}`)
            return {...room, ...{ id}}
        })
        console.log("pre",prePatchedRoom)

        const patchedRoom = prePatchedRoom.map((room) => {
            const patchedContent = room.content.map((exit) => {
                if (exit.type !== "exit")
                    return exit
                console.log(`Patching exit "${exit.name}" with target #${exit.target} to #${patchedId[exit.target]}`)
                return {...exit, ...{ target: patchedId[exit.target] }}
            }
            )
            return {...room, ...{ content: patchedContent }}
        })
        console.log("patched:",patchedRoom)
        const instancedRoom = patchedRoom.map((r) => this.create(r) )
        console.log(`Done, patched in ${patchedRoom.length} rooms:`)
        patchedRoom.map((room) => console.log(`#${room.id}:${room.name}`))
        return instancedRoom
    }

    save(){
           return {
            world:this.world,
            player:this.player,
            ui:this.ui,
            battle:{
                target:this.battle.target ? this.battle.target.id : null
            },
            new:this.new
        }
    }

}

export default StoreModule