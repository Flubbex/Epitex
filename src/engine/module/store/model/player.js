import Being from "./being"

class Player extends Being {

    type = "player"
    healTick = 0
    maxHealTick= 2
    room = "NULLED"
    locked = false 
    lockedMessage = "You feel compelled to stay where you are"
    quest = {}
    home = "NULLED"
    
    constructor(state={}){
        super(state)
        this.room = state.room ?? this.room
        this.quest = state.quest ? {...state.quest} : this.quest
        this.home = state.home ?? this.home
    }
    
     move(nextRoom,currentRoom){
        this.room = nextRoom.id

        if (currentRoom.event["playerLeft"])
            currentRoom.emit("event", currentRoom.event["playerLeft"], currentRoom, this)
        
        if (nextRoom.event["playerEntered"])
            nextRoom.emit("event", nextRoom.event["playerEntered"], nextRoom, this)
        
        this.emit("moved",nextRoom,currentRoom)
    }
    
    tick(API){
        if (this.health <= 0){
            API.print("Having lost the last of your health, you pass out..")
            const home = API.get(this.home)
            const room = API.get(this.room)
            this.move(home,room)
            this.health = this.statistic.maxHealth
            API.handle("look",true)
        }
        if (this.health < this.statistic.maxHealth)
        {
            this.healTick++
            if (this.healTick >= this.maxHealTick)
            {
                this.health++
                this.healTick = 0
            }
        }
    }

    calculateStatistic(modifier={}){
        modifier.constitution = modifier.constitution ? modifier.constitution+10 : 10
        return super.calculateStatistic(modifier)
    }

}

export default Player