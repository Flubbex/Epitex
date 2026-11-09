class ScriptModule {
    API = null

    script = null

    constructor(API) {
        this.API = API
    }


    load(script,override=false){
        window.dbg("ScriptModule",`Loading script (override=${override})`)


        this.script = override ? script : this.script + "\n" + script

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

        const call = new AsyncFunction('API', `with (API) {${this.script}}`)
        
        call(this.API)
    }

    loadObjectScript(object){
        window.dbg("ScriptModule",`Loading object script for ${object.name}`)

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

        const call = new AsyncFunction('API', `with (API) {${object.script}}`)

        call.apply(object,[this.API])
    }

    reset(){
        this.script = null
    }

}

export default ScriptModule
