import Emitter from '../class/emitter.js'

/**
 * UI module for managing input,output, notepad,music
 */
class UIModule extends Emitter {
    notepad = localStorage.getItem('notepad') ?? ''
    output = []
    input = ''
    music = { videoId: null, callBack: null, startSeconds: 0 }

    constructor(state = {}) {
        super()
        this.notepad = state.notepad ?? this.notepad
        this.output = state.output ?? this.output
        this.input = state.input ?? this.input
        this.music = state.music ?? this.music
    }

    setMusic(v) {
        this.music = v
        this.emit('updatedMusic', this.music)
    }

    setNotepad(v) {
        this.notepad = v
        this.emit("updatedNotepad",this.notepad)
    }

    toJSON() {
        return {
            output: this.output.slice(-250),
            input: this.input,
            notepad: this.notepad,
        }
    }

    printError(error) {
        //{type:"div",className:"text-danger"}
        this.print({type:"div",
            content:[
                {type:"div",className:"text-danger h4",content:"Something went wrong"},
            ].concat(
                error.stack
                .split('\n')
                .map((line) => ({type:"div",className:"text-danger",content:line}) )
            )
        })
        console.error(error)
    }

    clear() {
        this.output = []
        this.emit('updatedOutput', this.output)
    }

    /**
     * Normalize any value into an array of message descriptors.
     * - string → { type: "span", content }
     * - message object → [object]
     * - array → flatten + normalize each item
     * - null/undefined → []
     */
    normalizeToMessages(value) {
        if (value == null) return []

        if (typeof value === 'string') {
            // Preserve newlines as separate messages if desired, or keep as one
            // Uncomment the split if you want old string.split('\n') behavior
            // return value.split('\n').filter(Boolean).map(line => ({ type: 'span', content: line }))
            return [{ type: 'span', content: value }]
        }

        if (Array.isArray(value)) {
            return value.flatMap(item => this.normalizeToMessages(item))
        }

        if (typeof value === 'object' && value.type) {
            // Already a message descriptor
            return [value]
        }

        // Fallback for unexpected objects
        return [{ type: 'span', content: String(value) }]
    }

    print(content) {
        const messages = this.normalizeToMessages(content)
        if (messages.length === 0) return

        this.output = this.output.concat(messages)
        this.emit('updatedOutput', this.output)
    }

    handle(command){
        this.emit("commandHandled",command)
    }
}

export default UIModule
