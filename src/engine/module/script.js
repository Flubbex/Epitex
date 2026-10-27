class ScriptModule {

    API = null
    script = {}
    call = {}

    constructor(API){
        this.API = API
    }

    create(name,content){
        console.log("Creating script",name,content)
        if (name in this.script)
            console.warn("Overriding script",name)

        this.script[name] = content

        this.call[name] = new Function("API","with (API) {"+content+"}")
    }

    exists(name){
        return name in this.script
    }
    run(name){
        return this.call[name](this.API)
    }

}

export default ScriptModule