import Emitter from "../class/emitter"

class ParserController extends Emitter {

    constructor(game){
        super()
        window.dbg("ParserController","Init")
        this.game = game
        this.input = ""
        this.output = []
    }

    print(raw,isInput=false){
        let out = "[null]"
        if (typeof raw === "undefined")
            return
        else if (Array.isArray(raw))
            out = raw
        else if (typeof raw === "string")
            out = raw.split("\n")
        else if (typeof raw === "object")
            out = JSON.stringify(raw,null,2).split("\n")

        if (out === "[null]")
            return
        
        if (isInput)
        {
            this.output.pop()
            this.output = this.output.concat(out)
        } 
        else 
            this.output = this.output.concat(out,this.game.prompt())
        this.emit("updatedOutput", this.output)
    }

    clear(){
        this.output = []
        this.emit("updatedOutput", this.output)
    }

}

export default ParserController