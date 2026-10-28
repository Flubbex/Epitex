import Entity from '../entity.js'

class Exit extends Entity {
    name = 'Unnamed Exit'
    description = 'A nondescript exit'
    type = 'exit'
    target = 0

    constructor(state = {}) {
        super(state)
        this.name = state.name ?? this.name
        this.target = state.target ?? this.target
    }
}

export default Exit
