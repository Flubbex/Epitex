class ScriptModule {

    API = null
    script = {}

    constructor(API){
        this.API = API
    }

    registerScriptedObject(object){
        const id = object.id 
        for (const eventName in object.script)
            this.create(`${id}_${eventName}`,object.script[eventName],object)

        if ( this.exists(`${id}_init`) )
            this.run(`${id}_init`)
    }
    create(name,content,owner=null){
        console.log("Creating script",name,content)
        if (name in this.script)
            console.warn("Overriding script",name)

        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

        const call = new AsyncFunction("API",`with (API) {${content}}`)

        const newScript = {name,content,owner,call}
        this.script[name] = newScript
        return newScript
    }

    exists(name){
        return name in this.script
    }
    run(name){
        this.script[name].call.apply(this.script[name].owner,[this.API])
    }

}

export default ScriptModule