import Player from "./player.js"
import World from "./world.js"
import UI from "./ui.js"
import Battle from "./battle.js"

class storeModel {
    player = null
    world = null
    ui = null
    battle = null 

    constructor(){
         this.ui = new UI()
    }
    load(saveData){
        window.dbg("Store","Loading")

        this.world = new World(saveData.world)
        this.battle =new Battle(saveData.battle) 
        this.player = new Player(saveData.player)
        
        this.player.content = this.player.content.map((obj) => this.world.instance(obj) )
        
        this.new = "new" in saveData ? false : true

        this.gamePackInfo = saveData.gamePackInfo

        for (var prop in saveData.ui)
            this.ui[prop] = saveData.ui[prop]
         
        if (this.new) 
            if (this.gamePackInfo?.startRoom)
                this.player.room = this.gamePackInfo.startRoom
            else
                console.warn("Store doesn't know where to start player on a new game")
        
    }

    save(){
        return {
            world:this.world,
            player:this.player,
            ui:this.ui,
            battle:{
                target:this.battle.target ? this.battle.target.id : null
            },
            new:this.new
        }
    }
}

export default storeModel