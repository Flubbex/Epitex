import Being from "."


class NPC extends Being {
    idleMessage = ["glances around","coughs softly","hangs about"]
    idleChance = 0.9
    event = {
        "objAdded":["returnToPlayer"]
    }
    constructor(state={}){
        super(state)
        this.idleChance = state.idleChance ?? this.idleChance
        this.idleMessage = state.idleMessage ? [...state.idleMessage] : this.idleMessage

        this.event = state.event ?? this.event

    }

    randomIdleMessage(){
        const randomInt = Math.floor(Math.random()*this.idleMessage.length)
        return this.idleMessage[randomInt]
    }

    tick(game,room){
        super.tick(game,room)
        
        if (this.health <= 0)
            return
        
        if ( Math.random() > this.idleChance) {
            const idleMessage = this.randomIdleMessage()
            room.echo(`${this.name} ${idleMessage}`)
        }
    }
}

export default NPC