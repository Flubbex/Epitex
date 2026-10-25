import unid from "../../util/unid.js"
import cleanObj from "../../util/cleanObject.js"

import Emitter from "../class/emitter.js"

window.e = Emitter

class Entity extends Emitter {
    id = null
    name = "Nameless Entity"
    description = "This entity has no description"
    type = "entity"
    parent = null
    locked = false 

    tag = []
    action = {}
    event = {}

    //TODO: Parent will be the exact same as room on Beings and up (NPC,Player,etc)
    // Move it to items and then check for typing before setting it (see container)

    constructor(state = {}) {
        super()
        this.id = state.id ?? unid()
        this.name = state.name ?? this.name
        this.description = state.description ?? this.description
        this.type = state.type ?? this.type
        this.parent = state.parent ?? this.parent
        this.locked = state.locked ?? this.locked

        this.tag = state.tag ? [...state.tag] : this.tag
        this.action = state.action ? {...state.action} : this.action
        this.event = state.event ? {...state.event} : this.event

    }

    toJSON(){
        let out = Object.assign({},this,{call:null})
        out = cleanObj(out)
        return out
    }

    look() {
        return ["<b>" + this.name + "</b>", this.description]
    }

}

export default Entity