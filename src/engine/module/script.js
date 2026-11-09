class ScriptModule {
    API = null

    script = null

    constructor(API) {
        this.API = API
    }


    load(script,override=false){
        window.dbg("ScriptModule",`Loading script (override=${override})`)


        const next = script || ""
        this.script = override || !this.script ? next : this.script + "\n" + next

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

        let call 
        
        try {
            call = new AsyncFunction('API', `with (API) {${this.script}}`)
        }
        catch(err){
            throw new Error(err)
        }
        call(this.API)
    }

    loadObjectScript(object){
        window.dbg("ScriptModule",`Loading object script for ${object.name}`)

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        let call
        try {
            call = new AsyncFunction('API', `with (API) {${object.script}}`)
        } catch (err) {
            throw new Error(err)
        }

        call.apply(object,[this.API])
    }

    reset(){
        this.script = null
    }

}

export default ScriptModule
