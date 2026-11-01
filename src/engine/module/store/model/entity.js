import Emitter from '../../../class/emitter.js'

const cleanObject = (o) => {
    // Check if it's an array or an object and clean recursively
    if (Array.isArray(o)) {
        return o
            .map(cleanObject) // Recursively clean elements
            .filter((item) => item !== undefined) // Remove undefined entries (empty ones)
    } else if (typeof o === 'object' && o !== null) {
        const cleanedObj = {}
        for (const key in o) {
            const value = cleanObject(o[key]) // Recursively clean the value
            if (
                value !== undefined &&
                !(Array.isArray(value) && value.length === 0) &&
                !(typeof value === 'object' && Object.keys(value).length === 0)
            ) {
                cleanedObj[key] = value // Only add non-empty values
            }
        }
        return Object.keys(cleanedObj).length === 0 ? undefined : cleanedObj // Remove empty objects
    } else {
        return o !== null ? o : undefined // Remove null values
    }
}

class Entity extends Emitter {
    id = null
    name = 'Nameless Entity'
    description = 'This entity has no description'
    type = 'entity'
    parent = null
    locked = false

    tag = []
    action = {}
    script = null

    //TODO: Parent will be the exact same as room on Beings and up (NPC,Player,etc)
    // Move it to items and then check for typing before setting it (see container)

    constructor(state = {}) {
        super()
        this.id = state.id

        this.name = state.name ?? this.name
        this.description = state.description ?? this.description
        this.type = state.type ?? this.type
        this.parent = state.parent ?? this.parent
        this.locked = state.locked ?? this.locked

        this.tag = state.tag ? [...state.tag] : this.tag
        this.action = state.action ? { ...state.action } : this.action

        this.script = state.script ?? this.script

        if (this.id === null)
            console.warn(`Object "${this.name}" was created with an invalid id`)
    }

    toJSON() {
        let out = Object.assign({}, this, { call: null })
        out = this.cleanObject(out)
        return out
    }

    cleanObject(o) {
        return cleanObject(o)
    }

    unid() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let result = ''

        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            result += characters[randomIndex]
        }

        return result
    }
    look() {
        return ['<b>' + this.name + '</b>', this.description]
    }
}

export default Entity
