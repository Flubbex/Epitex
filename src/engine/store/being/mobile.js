import NPC from "./npc.js"

class Mobile extends NPC {
    moveChance = 0.05
    spawner = null
    area = 0
    constructor(state={}){
        super(state)
        this.moveChance = state.moveChance ?? this.moveChance
        this.spawner = state.spawner ?? this.spawner
        this.area = state.area ?? this.area
    }

    tick(API,room){
        super.tick(API,room)
        if (this.health <= 0)
        {
            const parent = API.get(this.parent)
            if (parent.type === "spawner")
            {
                parent.eject(this.id)
            }
            return
        }
        if (this.locked)
            return
        if (Math.random()<this.moveChance)
            this.moveRandom(game,room)

    }
    randomExit(list){
        const randomInt = Math.floor(Math.random()*list.length)
        return list[randomInt]
    }

    moveRandom({store:{world}},room){
        let attemptLeft = 3
        let next = null
        const exitOrList = room.get("exit")

        if (!exitOrList)
            return 
        
        while (attemptLeft > 0) {
            next = exitOrList.length ? this.randomExit(exitOrList) : exitOrList
            if (world.byId[next.target].area!==this.area)
                next = null
            else 
                break
            attemptLeft--
        }
          
        if (next === null) 
            return

        room.echo(this.name+" moves towards the "+next.name.toLowerCase())
        world.get(next.target).echo(this.name+" walks in")
        
        this.move(world.get(next.target),room)
        
        this.room = next.target
    }
}

export default Mobile

