import Emitter from "../class/emitter"

const cardinalExit = {
    "n":"north",
    "w":"west",
    "e":"east",
    "s":"south",
    "ne":"northeast",
    "nw":"northwest",
    "se":"southeast",
    "sw":"southwest"
}

 const cardinalMoveWare = (API) => {
    return (_target) => {
        const target = cardinalExit[_target.toLowerCase()] || _target.toLowerCase()
        const room = API.room()

        const exit = room.get("exit", target)
        if (!exit)
            return null
        if (exit.length)
            return ["Ambigious exit, did you mean any of these?"].concat(exit.map((e) => e.name))

        return API.handle("go " + exit.name, true)
    }
 }

export default class InteractionModule extends Emitter {
    
    API = null
    command = {}
    ware = []

    constructor(API){
        super()
        this.API = API

        this.createWare(cardinalMoveWare)
    }

    reset(){
        this.command = {}
    }
    load(command){
        window.dbg("InteractionModule","Loading ",Object.keys(command).length,"commands")
        this.command = {...this.command,...command}
    }

    createWare(wareConstructor){
        this.registerWare( wareConstructor(this.API) )
    }

    registerWare(call){
        this.ware.push(call)
    }
    
    error(v){
        return `Unknown command "${v}" `
    }

    parseInput(inputString) {
        // Regular expression to match words and quoted phrases
        const pattern = /"([^"]+)"|(\S+)/g;
        let matches;
        let args = [];
    
        // Use exec in a loop to capture all matches
        while ((matches = pattern.exec(inputString)) !== null) {
            // Either the quoted match or the single word will be captured
            args.push(matches[1] ? matches[1] : matches[2]);
        }

        return args;
    }

    runHandle(clean,arg){
        //window.dbg("InteractionModule",`Handling "${clean}"`)
        //We first check if the command is in the general command set
        if (this.command[clean])
            return this.command[clean](arg)

        //We now check if there's an action in the player's current room
        const room = this.API.room()
        if (room.action[clean])
            return this.API.runAction(room.action[clean],room,arg)

        //We check any item inside of the current room
        const targetItem = room.content.find((e)=>e.action && e.action[clean])
        if (targetItem)
            return this.API.runAction(targetItem.action[clean],targetItem,arg)

        //Finally, we check the player's inventory
        const player = this.API.player()
        const playerItem = player.content.find((e)=>e.action && e.action[clean])
        if (playerItem)
            return this.API.runAction(playerItem.action[clean],playerItem,arg)

        return this.error(clean)
    }

    doHandle(input,silent){
        const arg = this.parseInput(input)
        const name = arg.shift() 
        const clean = name.toString().toLowerCase()

        if (!silent)
            this.emit("output",`<span class='text-warning'>${input}</span>`,true)
        
        const wareResult = this.ware.map((ware)=>ware(clean,arg)).filter((e) => e)

        if (wareResult.length)
            return wareResult

        const output = this.runHandle(clean,arg) 
        
        this.emit("output",output)

        return output
    }

    handle(input,silent){
        return input.split(";").map( (p) => this.doHandle(p,silent) )
    }
}