import Item from "."

class Key extends Item {

    name = "Key"
    description = "A nondescript key"
    type = "key"
    target = null 

    constructor(state={}){
        super(state)
        this.name = state.name ?? this.name 
        this.description = state.description ?? this.description
        this.target = state.target ?? this.target
    }
}

export default Key