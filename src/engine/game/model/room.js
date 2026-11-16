import Container from "./container.js"

class Room extends Container {
    type = "room"
    area = 0

    constructor(state = {}) {
        super(state)
        this.name = state.name ?? "Nameless Room"
        this.description = state.description ?? "This room has no description"
        this.area = state.area ?? this.area
    }

    echo(...message) {
        this.emit("echo", this, ...message)
    }

    tick(API) {
        this.content.map((e) => e.tick && e.tick(API, this))
    }

    buttonify(content, command) {
        return { type: "button", className: "btn", content, command }
    }
}

export default Room
