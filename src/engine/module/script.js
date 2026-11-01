class ScriptModule {
    API = null

    script = {}

    constructor(API) {
        this.API = API
    }


    reset(){
        this.script = {}
    }
    
    register(object) {
        const id = object.id
        for (const eventName in object.script)
            this.create(`${id}_${eventName}`, object.script[eventName], object)
    }

    create(name, content, owner = null) {
        window.dbg("ScriptModule","Creating", name,owner?owner.name:null)
        if (name in this.script) console.warn('Overriding script', name)

        const AsyncFunction = Object.getPrototypeOf(
            async function () {}
        ).constructor

        const call = new AsyncFunction('API', `with (API) {${content}}`)

        const newScript = { name, content, owner, call }
        this.script[name] = newScript
        return newScript
    }

    exists(name) {
        return name in this.script
    }

    runAll(event){
        window.dbg("scriptModule","Running all",event)
        const keys = Object.keys(this.script).filter((e)=>e.indexOf(event) !== -1)
        
        keys.map((script) => this.run(script))
    }

    run(name,...arg) {
        if (!this.script[name])
            return 

        window.dbg("scriptModule","Running",name)

        try {
            this.script[name].call.apply(this.script[name].owner, [this.API].concat(arg))
        } catch (e)
        {
            throw new Error(`Encountered a problem running script '${name}'`,e)
        }
    }
}

export default ScriptModule
