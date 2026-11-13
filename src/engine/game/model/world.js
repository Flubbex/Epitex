class World {
    room = []
    zone = []

    constructor(state = {}) {
        this.room = state.room ? [...state.room] : this.room
    }
}

export default World
