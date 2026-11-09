import Emitter from '../../../class/emitter.js'

/**
 * Storage model for managing input,output, notepad and modals
 */
class UIModel extends Emitter {
    notepad = localStorage.getItem('notepad') ?? ''
    output = []
    input = ''
    music = { videoId: null, callBack: null, startSeconds: 0 }

    constructor(state = {}) {
        super()
        this.load(state)
    }

    load(state = {}) {
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
        this.print("<h4 class='text-danger bold'>Something went wrong</h4>")
        this.print(
            error.stack
                .split('\n')
                .map((p) => "<span class='text-danger'>" + p + '</span>')
        )
        console.error(error)
    }

    clear() {
        this.output = []
        this.emit('updatedOutput', this.output)
    }

    render(raw) {
        let out = null
        if (typeof raw === 'undefined') return out
        else if (Array.isArray(raw)) out = raw
        else if (typeof raw === 'string') out = raw.split('\n')
        else if (typeof raw === 'object')
            out = JSON.stringify(raw, null, 2).split('\n')

        return out
    }

    print(raw) {
        const out = this.render(raw)

        if (out === null) return

        this.output = this.output.concat(out)

        this.emit('updatedOutput', this.output)
    }
}

export default UIModel
