import Emitter from "../class/emitter"

export default class CombatModule extends Emitter {

    API = null
    battle = {target:null} 

    playerTimeout = null 
    enemyTimeout = null 

    constructor(API) {
        super()
        window.dbg("CombatModule", "Constructing")
        this.API = API
    }

    attemptResume(battle){
         if (battle.target) {
            window.dbg("CombatModule", "Continuing fight")
            const target = this.API.get(battle.target)
            this.API.print("The fight resumes!")
            this.fight(target) 
        }
        else
            window.dbg("CombatModule","No fight to continue")
    }

    endFight(){
        window.dbg("CombatModule", "Ending fight")
        window.clearTimeout(this.playerTimeout)
        window.clearTimeout(this.enemyTimeout)
        this.battle.target = null 
        this.API.setBattle(this.battle)
    }

    fight(target) {
        this.battle.target = target
        this.API.setBattle(this.battle)
        
        target.locked = true
        const player = this.API.player()

        this.playerTimeout = this.attack(player, target)
        this.enemyTimeout = this.attack(target, player)
        
        return `You attack the ${target.name}!`
    }

    attack(fighter, defender) {
        if (fighter.health <= 0 || defender.health <= 0)
            return

        const damage = fighter.damage()

        if (damage)
            this.API.print(`${fighter.name} attacks for ${damage} damage!`)
        else
            this.API.print(`${fighter.name} fails miserably to attack ${defender.name}`)

        defender.hurt(damage, fighter)

        if (defender.health <= 0) {

            if (fighter.type === "player") {
                this.API.print(`You've slain the ${defender.name}`)
            }
            else
                this.API.print(`You've been slain by the ${fighter.name}`)

            this.endFight()

            return null
        }
        else
            return window.setTimeout(() => this.attack(fighter, defender), fighter.statistic.attSpeed * 2)
    }

}