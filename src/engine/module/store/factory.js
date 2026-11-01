import Emitter from '../../class/emitter.js'

import Room from './model/room/index.js'
import Exit from './model/room/exit.js'
import Menu from './model/room/menu.js'

import Item from './model/item/index.js'
import Key from './model/item/key.js'

import Container from './model/container.js'
import Spawner from './model/spawner.js'

import NPC from './model/being/npc.js'
import Mobile from './model/being/mobile.js'

const typeTable = {
    room: Room,
    exit: Exit,
    item: Item,
    npc: NPC,
    container: Container,
    mobile: Mobile,
    spawner: Spawner,
    menu: Menu,
    key: Key,
}

class Factory extends Emitter {
    unid() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let result = ''

        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            result += characters[randomIndex]
        }

        return result
    }
    validate(state) {
        const out = { ...state }
        if (!out.id) out.id = this.unid()
        return out
    }

    doInstance(type, state = {}) {
        //console.log("Instancing",type,state.name)

        if (type in typeTable === false) {
            console.warn(
                `World tried to instantiate unknown '${type}' type`,
                state
            )
            return new Item({ name: 'Error' })
        }

        const validatedState = this.validate(state)
        const out = new typeTable[type](validatedState)

        //Warning: If something is nested recursively, this will cause a loop
        //Realistically this should never happen, but be aware
        if (out.content)
            out.content = out.content.map((object) => this.instance(object))

        if (!out.parent) out.parent = 'NULLED'


        this.emit("instanced",out)
        return out
    }

    instance(stateOrType, state = {}) {
        let result = null
        if (typeof stateOrType === 'string')
            result = this.doInstance(stateOrType, state)
        else result = this.doInstance(stateOrType.type, stateOrType)

        return result
    }
}

export default Factory
