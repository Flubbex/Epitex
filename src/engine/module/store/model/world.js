class World {
    
    room = []
    zone = []

    constructor(state={}){
        window.dbg("Store/world","Constructor")
        if (state.room)
            this.room = state.room
        else 
            console.warn("World constructed without any rooms",state)
    }
}

export default World
