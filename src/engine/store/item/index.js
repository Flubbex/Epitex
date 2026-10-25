import Entity from "../entity"

class Item extends Entity {

    name = "Unnamed Item"
    description = "A nondescript item"
    type = "item"
    
    constructor(state = {}){
        super(state)
        this.name = state.name ?? this.name
        this.description = state.description ?? this.description
    }
}

export default Item