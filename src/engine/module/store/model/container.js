import Entity from './entity.js'

//Describes an entity that may contain other entities
class Container extends Entity {
    content = []

    constructor(state = {}) {
        super(state)
        if (state && state.content) state.content.map((i) => this.add(i))
    }

    tick(API,room){
        super.tick(API,room)
    }
    
    add(item) {
        if (this.type === 'room') item.room = this.id
        else item.parent = this.id

        this.emit('object_added', this, item)

        return this.content.push(item)
    }

    remove(item) {
        const c = this.content.length
        this.content = this.content.filter((i) => i.id !== item.id)
        if (this.content.length === c)
            console.warn(this.name, 'tried to remove', item.name, 'but failed')

        this.emit('object_removed', this, item)

        return this.content.length
    }

    look() {
        let out = super.look()

        if (this.content.length > 0)
            out = [
                ...out,
                '<i>Contents:</i>',
                ...this.content.map((i) => i.name),
            ]

        return out
    }
    get(type, name = '') {
        const obj = this.content
            .filter((i) => (type === 'any' ? true : i.type === type))
            .filter((i, k) => {
                const nameIsKey = parseInt(name)
                if (!isNaN(nameIsKey)) return k === nameIsKey - 1 //Adjusted for 0
                return i.name.toLowerCase().includes(name.toLowerCase())
            })

        return obj.length > 1
            ? obj // Return all obj found
            : obj.length === 1
              ? obj[0] //Return the one obj
              : null //No obj found
    }
}

export default Container
