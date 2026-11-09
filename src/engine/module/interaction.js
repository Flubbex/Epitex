import Emitter from '../class/emitter'

const cardinalExit = {
    n: 'north',
    w: 'west',
    e: 'east',
    s: 'south',
    ne: 'northeast',
    nw: 'northwest',
    se: 'southeast',
    sw: 'southwest',
}

const cardinalMoveWare = (API) => {
    return (_target) => {
        const target =
            cardinalExit[_target.toLowerCase()] || _target.toLowerCase()
        const room = API.room()

        const exit = room.get('exit', target)
        if (!exit) return null
        if (exit.length)
            return ['Ambigious exit, did you mean any of these?'].concat(
                exit.map((e) => e.name)
            )

        return API.handle('go ' + exit.name, true)
    }
}

export default class InteractionModule extends Emitter {
    API = null
    request = null
    command = {}
    ware = []
    

    constructor(API) {
        super()
        this.API = API

        this.createWare(cardinalMoveWare)
    }

    reset() {
        this.command = {}
    }
    load(command) {
        window.dbg(
            'InteractionModule',
            'Loading ',
            Object.keys(command).length,
            'commands'
        )
        this.command = { ...this.command, ...command }
    }

    createWare(wareConstructor) {
        this.registerWare(wareConstructor(this.API))
    }

    registerWare(call) {
        this.ware.push(call)
    }

    error(v) {
        return `Unknown command "${v}" `
    }

    parseInput(inputString) {
        // Regular expression to match words and quoted phrases
        const pattern = /"([^"]+)"|(\S+)/g
        let matches
        let args = []

        // Use exec in a loop to capture all matches
        while ((matches = pattern.exec(inputString)) !== null) {
            // Either the quoted match or the single word will be captured
            args.push(matches[1] ? matches[1] : matches[2])
        }

        return args
    }

    runHandle(clean, arg) {
        if (this.command[clean]) return this.command[clean](arg)

        const room = this.API.room()
        if (room.action?.includes(clean)) {
            room.emit("action_" + clean, room, arg)
            return
        }

        const roomItem = room.content.find(e => e.action?.includes(clean))
        if (roomItem) {
            roomItem.emit("action_" + clean, roomItem, arg)
            return
        }

        const invItem = this.API.player().content.find(e => e.action?.includes(clean))
        if (invItem) {
            invItem.emit("action_" + clean, invItem, arg)
            return
        }

        return this.error(clean)
    }

    doHandle(input, silent) {
        const arg = this.parseInput(input)
        const name = arg.shift()
        const clean = name.toString().toLowerCase()

        if (!silent)
            this.emit(
                'output',
                `<span class='text-warning'>${input}</span>`,
                true
            )

        const wareResult = this.ware
            .map((ware) => ware(clean, arg))
            .filter((e) => e)

        if (wareResult.length) return wareResult

        const output = this.runHandle(clean, arg)

        this.emit('output', output)

        return output
    }

    handle(input, silent) {
        const splitInput = input.split(';') 
        if (this.request) {
            const result = this.request(splitInput)
            this.emit('output',result)
        }
        else 
            return splitInput.map((p) => this.doHandle(p, silent))
    }
}
