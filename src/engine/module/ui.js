import Emitter from "../class/emitter.js"

import PrinterModule from "./printer.js"

/**
 * UI module for managing input,output, notepad,music
 */
class UIModule extends Emitter {
    notepad = localStorage.getItem("notepad") ?? ""
    output = []
    input = ""
    music = { videoId: null, callBack: null, startSeconds: 0 }

    printer = new PrinterModule()

    constructor(state = {}) {
        super()
        this.notepad = state.notepad ?? this.notepad
        this.output = state.output ?? this.output
        this.input = state.input ?? this.input
        this.music = state.music ?? this.music

        this.printer.on("printed", (messageList) =>
            this.add("output", messageList)
        )

        this.printer.on("modified",(message,prop,value) => {
            message[prop] = value 
            this.output = [...this.output]
            this.emit("updated_output",this.output)
        })
    }

    set(property, value) {
        this[property] = value
        this.emit("updated_" + property, this[property])
    }

    add(property, value) {
        this[property] = this[property].concat(value)
        this.emit("updated_" + property, this[property])
    }

    toJSON() {
        return {
            output: this.output.slice(-250),
            input: this.input,
            notepad: this.notepad,
        }
    }

    printError(error) {
        this.print({
            type: "div",
            content: [
                {
                    type: "div",
                    className: "text-danger h4",
                    content: "Something went wrong",
                },
            ].concat(
                error.stack
                    .split("\n")
                    .map((line) => ({
                        type: "div",
                        className: "text-danger",
                        content: line,
                    }))
            ),
        })
        console.error(error)
    }

    clear() {
        this.set("output", [])
    }
    print(content) {
        return this.printer.print(content)
    }

    handle(command,silent) {
        this.emit("commandHandled", command,silent)
    }
}

export default UIModule
