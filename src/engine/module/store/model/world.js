class World {
    room = []
    zone = []

    constructor(state = {}) {
        window.dbg('Store/world', 'Constructor')
        this.room = state.room ? [...state.room] : this.room
    }
}

export default World
