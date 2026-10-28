import Container from './container'

class Spawner extends Container {
    chance = 1
    limit = 1
    entities = []

    constructor(props = {}) {
        super(props)
        this.chance = props.chance ?? this.chance
        this.limit = props.limit ?? this.limit
        this.entities = props.entities ? [...props.entities] : this.entities
    }

    eject(entId) {
        this.entities = this.entities.filter((e) => e !== entId)
    }

    randomItem() {
        const randomInt = Math.floor(Math.random() * this.content.length)
        return this.content[randomInt]
    }

    tick(API, room) {
        if (this.entities.length >= this.limit) return
        if (Math.random() > this.chance) return

        const newEnemy = API.create({ ...this.randomItem(), ...{ id: null } })
        this.entities.push(newEnemy.id)
        room.add(newEnemy)
        room.echo('A ' + newEnemy.name + ' enters the room')
    }
}

export default Spawner
