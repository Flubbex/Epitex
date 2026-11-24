import Emitter from "../class/emitter"

class ScriptModule extends Emitter {
    API = null

    source = null

    constructor(API,source) {
        super()
        this.API = API
        this.source = source ?? null 
    }

     runScript(script,parent=null) {
        if (parent)
            parent.removeAllListeners()
        
        const AsyncFunction = Object.getPrototypeOf(
            async function () {}
        ).constructor
        const call = new AsyncFunction("API", `with (API) {
            try { 
            ${script} 
            }catch(err){
            game().script.emit("errored",err)
            } 
            
            }`)
        call.apply(parent, [this.API])
 
    }

    runObjectScript(object){
        window.dbg("ScriptModule", `Running object script for ${object.name}`)
        this.runScript(object.script,object)
    }
    start() {
        window.dbg("ScriptModule", `Running main script`)
        if (this.source)
            this.runScript(this.source)
    }

    reset() {
        this.script = null
    }
}

export default ScriptModule
