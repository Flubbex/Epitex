import Emitter from "../class/emitter"

export default class PrinterModule extends Emitter {
    normalizeToMessages(value) {
        if (value == null) return []

        if (typeof value === "string") {
            // Preserve newlines as separate messages if desired, or keep as one
            // Uncomment the split if you want old string.split('\n') behavior
            // return value.split('\n').filter(Boolean).map(line => ({ type: 'span', content: line }))
            return [{ type: "span", content: value }]
        }

        if (Array.isArray(value)) {
            return value.flatMap((item) => this.normalizeToMessages(item))
        }

        if (typeof value === "object" && value.type) {
            // Already a message descriptor
            return [value]
        }

        // Fallback for unexpected objects
        return [{ type: "span", content: String(value) }]
    }

    print(content) {
        const messages = this.normalizeToMessages(content)
        if (messages.length === 0) return

        this.emit("printed", messages)
    }

    text(content, className) {
        return { type: "span", content, className }
    }

    div(content, className) {
        return { type: "div", content, className }
    }

    h(content, level = 4, addClassName = "bold") {
        return { type: "div", content, className: `h${level} ` + addClassName }
    }

    bold(content) {
        return { type: "span", content, className: "bold" }
    }

    button(
        content,
        command,
        className = "btn"
    ) {
        return { type: "button", content, command, className }
    }

    br() {
        return { type: "br" }
    }

    group(content, className, type = "div") {
        return { type, content, className }
    }

    buttonList(items, commandFn, className) {
        return items.map((item) =>
            this.button(
                typeof item === "string" ? item : item.name,
                typeof commandFn === "function" ? commandFn(item) : commandFn,
                className
            )
        )
    }

    section(title, children, titleClass = "bold mt-2 mb-1") {
        return {
            type: "div",
            content: [
                this.div(title, titleClass),
                ...(Array.isArray(children) ? children : [children]),
            ],
        }
    }

    presentContent(object) {
        let exitList = []
        let itemList = []
        let beingList = []

        object.content.map((obj) => {
            switch (obj.type) {
                case "item":
                case "key":
                case "container":
                    itemList.push(this.button(obj.name, `look ${obj.name}`))
                    break
                case "being":
                case "npc":
                case "mobile":
                    beingList.push(this.button(obj.name, `look ${obj.name}`))
                    break
                case "exit":
                    const lockedName = obj.locked
                        ? `${obj.name} (locked)`
                        : obj.name
                    exitList.push(this.button(lockedName, `go ${obj.name}`))
                    break
                case "spawner":
                case "player":
                    break
                default:
                    console.warn(
                        obj.name,
                        "contains an invalid item:",
                        obj.name
                    )
                    break
            }
            return null
        })

        itemList = itemList.sort((a, b) => String(a.content).localeCompare(String(b.content)))
        exitList = exitList.sort((a, b) => String(a.content).localeCompare(String(b.content)))
        beingList = beingList.sort((a, b) => String(a.content).localeCompare(String(b.content)))
        return { exitList, itemList, beingList }
    }

    present(object) {
        const name =
            typeof object.name === "string"
                ? this.bold(object.name)
                : object.name

        const description =
            typeof object.description === "string"
                ? this.text(object.description)
                : object.description

        switch (object.type) {
            case "menu":
                this.print(description)
                break
            case "room":
                const { itemList, beingList, exitList } = this.presentContent(object)
                this.print(
                    [
                        this.h(object.name, 4,"text-primary"),
                        description,
                        itemList.length
                            ? this.section("Items here:", itemList)
                            : null,
                        beingList.length
                            ? this.section("Beings here:", beingList)
                            : null,
                        this.section("Available Exits:", exitList),
                    ].filter((e) => e)
                )
                break
            default:
                this.print([name, description])
        }
    }
}
