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

    presentContent() {
        const exitList = []
        const itemList = []
        const beingList = []

        this.content.map((obj) => {
            switch (obj.type) {
                case "item":
                case "key":
                case "container":
                    itemList.push(this.buttonify(obj.name, `look ${obj.name}`))
                    break
                case "being":
                case "npc":
                case "mobile":
                    beingList.push(this.buttonify(obj.name, `look ${obj.name}`))
                    break
                case "exit":
                    const lockedName = obj.locked
                        ? `${obj.name} (locked)`
                        : obj.name
                    exitList.push(this.buttonify(lockedName, `go ${obj.name}`))
                    break
                case "spawner":
                case "player":
                    break
                default:
                    console.warn(
                        this.name,
                        "contains an invalid item:",
                        obj.name
                    )
                    break
            }
            return null
        })

        return { exitList, itemList, beingList }
    }
}

export default Room
