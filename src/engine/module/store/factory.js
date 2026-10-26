import Room from "./model/room/index.js"
import Exit from "./model/room/exit.js"
import Menu from "./model/room/menu.js"

import Item from "./model/item/index.js"
import Key  from "./model/item/key.js"

import Container from "./model/container.js"
import Spawner from "./model/spawner.js"

import NPC from "./model/being/npc.js"
import Mobile from "./model/being/mobile.js"

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

class Factory {

    instance(stateOrType,state={}){
        if (typeof(stateOrType) === "string" )
            return this.doInstance(stateOrType,state)
        else 
            return this.doInstance(stateOrType.type,stateOrType)
    }

    unid(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters[randomIndex]
    }
    
    return result
}
    validate(state){
        const out = {...state}
        if (!out.id)
            out.id = this.unid()
        return out
    }

    doInstance(type,state={}){
        //console.log("Instancing",type,state.name)
   
        if (type in typeTable === false) {
            console.warn(`World tried to instantiate unknown '${type}' type`,state)
            return new Item({name:"Error"})
        }

        const validatedState = this.validate(state)
        const out = new typeTable[type](validatedState)

        if (out.content)
            out.content = out.content.map((i)=> this.instance(i) )

        if (!out.parent)
            out.parent = "NULLED"
        
        return out
    }
}

export default Factory