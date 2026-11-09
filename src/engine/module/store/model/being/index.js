import Container from '../container'

const attrSet = {
    strength: 0,
    intelligence: 0,
    dexterity: 0,
    constitution: 0,
    wisdom: 0,
    charisma: 0,
    luck: 0,
}

/**
 * Represents a being; an entity with an inventory, health and attributes.
 * @constructor
 * @param {any} state - The current state of the being
 */
class Being extends Container {
    room = 'NULLED'
    health = null
    attribute = {
        strength: 1,
        intelligence: 1,
        dexterity: 1,
        constitution: 1,
        wisdom: 1,
        charisma: 1,
        luck: 1,
    }

    constructor(state = {}) {
        super(state)
        this.room = state.room ?? this.room
        this.health = state.health ?? this.health
        this.attribute = state.attribute
            ? { ...this.attribute, ...state.attribute }
            : this.attribute

        this.statistic = this.calculateStatistic()
        this.health = this.statistic.maxHealth
    }

    move(nextRoom, currentRoom) {
        this.room = nextRoom.id
        nextRoom.add(this)
        currentRoom.remove(this)
        this.emit('moved', this,nextRoom, currentRoom)
    }

    decompose(API,room){
        this.health--

        if (this.health <= -5) {
            room.echo(this.name + ' has wasted away')
            API.get(this.room).remove(this)
        } else if (this.health == -2) {
            room.echo(this.name + ' has turned to a corpse')
            this.name = 'Corpse of ' + this.name
        }
    }
    tick(API, room) {
        super.tick(API,room)
        if (this.health <= 0)
            this.decompose(API,room)
    }

    die() {
        this.type = 'item'
        this.name = this.name + ' (deceased)'
        this.emit('died', this)
    }

    damage() {
        const randomInt = Math.floor(Math.random() * this.statistic.damage + 1)
        return randomInt
    }

    hurt(amount, inflictor) {
        this.health = this.health - amount < 0 ? 0 : this.health - amount
        if (this.health <= 0) this.die()
        this.emit('hurt', this,amount, inflictor)
    }

    calculateStatistic(_modifier = {}) {
        const s = {
            s: this.attribute.strength,
            d: this.attribute.dexterity,
            i: this.attribute.intelligence,
            w: this.attribute.wisdom,
            l: this.attribute.luck,
            c: this.attribute.charisma,
            co: this.attribute.constitution,
        }

        const modifier = Object.assign({}, attrSet, _modifier)

        return {
            damage: s.s + modifier.strength,
            critChance: Math.floor(s.d + modifier.dexterity),
            critDamage: 1.5,
            maxWeight: Math.floor(s.s / 2 + s.co / 2) + modifier.strength,
            maxHealth: s.co + modifier.constitution + s.s + modifier.strength,
            attSpeed: 5000.0 / Number.parseFloat(s.d * 2),
        }
    }

    spaced(name, value, dist) {
        const spacer = ' '.repeat(dist - name.length)
        return name + spacer + value
    }

    score() {
        const out = [
            this.spaced(
                'health',
                this.health + '/' + this.statistic.maxHealth,
                15
            ),
        ]
        out.push('------')
        Object.keys(this.attribute).map((k) =>
            out.push(this.spaced(k, this.attribute[k], 15))
        )
        out.push('------')
        Object.keys(this.statistic).map((k) =>
            out.push(this.spaced(k, this.statistic[k], 15))
        )
        return out
    }
}

export default Being
