import Room from "./room/index.js"
import Exit from "./room/exit.js"
import Menu from "./room/menu.js"

import Item from "./item/index.js"
import Key  from "./item/key.js"

import Container from "./container.js"
import Spawner from "./spawner.js"

import NPC from "./being/npc.js"
import Mobile from "./being/mobile.js"

import unid from "../../util/unid.js"

const typeTable = {
    "room":Room,
    "exit":Exit,
    "item":Item,
    "npc":NPC,
    "container":Container,
    "mobile":Mobile,
    "spawner":Spawner,
    "menu":Menu,
    "key":Key
}

class World {
    room = []
    byId = {} 
    date = new Date(-2183605729865)

    constructor(state={}){
        window.dbg("Store/world","Constructor")
        if (state.room)
            this.loadState(state)
        else 
            console.warn("World constructed without any rooms",state)
        this.date = state.date ? new Date(state.date) : this.date
    }

    instance(stateOrType,state={}){
        if (typeof(stateOrType) === "string" )
            return this.doInstance(stateOrType,state)
        else 
            return this.doInstance(stateOrType.type,stateOrType)
    }
    

    doInstance(type,state={}){
        //console.log("Instancing",type,state.name)
   
        if (type in typeTable === false) {
            console.warn(`World tried to instantiate unknown '${type}' type`,state)
            return new Item({name:"Error"})
        }

        const out = new typeTable[type](state)

        if (out.content)
            out.content = out.content.map((i)=> this.instance(i) )

        if (out.id in this.byId) {
            console.warn("Collision warning: #"+out.id+" in instance data as",out.name)
            console.warn("Overiding old entry for now")
        }

        this.byId[out.id] = out 

        if (!out.parent)
            out.parent = "NULLED"

        if (out.id !== "NULLED") 
            out.on("*",(...e)=>this.get("NULLED").emit(...e))
        
        return out
    }


    patch (data) {
        window.dbg("WorldModel","Patching load data")
        const patchedId = {}
        const prePatchedRoom = data.room.map((room) => {
            const newId = unid()
            patchedId[room.id] = newId
            console.log("Stored room id #" + room.id + " as room id #" + newId)
            return Object.assign({}, room, { id: newId })
        })
        console.log("pre",prePatchedRoom)

        const patchedRoom = prePatchedRoom.map((room) => {
            const patchedContent = room.content.map((exit) => {
                if (exit.type !== "exit")
                    return exit
                console.log("Patching exit '"+exit.name+"'with target #" + exit.target + " to #" + patchedId[exit.target])
                return Object.assign({}, exit, { target: patchedId[exit.target] })
            }
            )
            return Object.assign({}, room, { content: patchedContent })
        })
        console.log("patched:",patchedRoom)
        const instancedRoom = patchedRoom.map((r) => this.instance(r) )
        this.add(instancedRoom)
        console.log("Done, patched in " + patchedRoom.length + " rooms:")
        patchedRoom.map((room) => console.log("#" + room.id + " : " + room.name))
        return instancedRoom
    }

    loadState(savedState){
        this.byId = {}
        this.room = savedState.room.map((room)=>this.instance(room)) 
    }

    add(roomOrList){
        if (roomOrList.length)
            this.room = this.room.concat(roomOrList)
        else
            this.room.push(roomOrList)
    }
    get(roomId){
        const foundRoom = this.byId[roomId]

        if (!foundRoom){
             console.log(this)
            throw new Error("World Tried getting invalid room #"+roomId)
        }
        return foundRoom
    }

    toJSON(){
        const out = Object.assign({},this)
        out.byId = {} //Remove byId cache
        return out
    }
    
}

export default World
