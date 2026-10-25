import Emitter from "../class/emitter"

export default class EventModule extends Emitter {

    API = null

    constructor(API){
        super()
        this.API = API
    }

    createHandler(){
        return this.handle.bind(this)
    }

    handle(event, ...arg) {
        window.dbg("EventService",`Handling events ${event}`)

        event.map((name) =>{
            const eventCall = this.API.getEvent(name)
            if (eventCall)
                window.setTimeout(eventCall,0,...arg)
            else
                console.warn(`Missing event handler for "${event}"`)
        })
        
    }
}
