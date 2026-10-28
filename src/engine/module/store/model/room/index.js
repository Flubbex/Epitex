import Container from '../container.js'

class Room extends Container {
    type = 'room'
    area = 0

    constructor(state = {}) {
        super(state)
        this.name = state.name ?? 'Nameless Room'
        this.description = state.description ?? 'This room has no description'
        this.area = state.area ?? this.area
    }

    echo(...message) {
        this.emit('echo', ...message)
    }

    tick(API) {
        this.content.map((e) => e.tick && e.tick(API, this))
    }

    buttonify(text, onClick) {
        return `<button class='btn btn-secondary' onClick='${onClick}'>${text}</button>`
    }
    look() {
        const exitList = []
        const itemList = []
        const beingList = []

        this.content.map((obj) => {
            switch (obj.type) {
                case 'item':
                case 'key':
                case 'container':
                    itemList.push(
                        this.buttonify(
                            obj.name,
                            `game.handle("look ${obj.name}")`
                        )
                    )
                    break
                case 'being':
                case 'npc':
                case 'mobile':
                    beingList.push(
                        this.buttonify(
                            obj.name,
                            `game.handle("look ${obj.name}")`
                        )
                    )
                    break
                case 'exit':
                    const lockedName = obj.locked
                        ? `${obj.name} (locked)`
                        : obj.name
                    exitList.push(
                        this.buttonify(
                            lockedName,
                            `game.handle("go ${obj.name}")`
                        )
                    )
                    break
                case 'spawner':
                case 'player':
                    break
                default:
                    console.warn(
                        this.name,
                        'contains an invalid item:',
                        obj.name
                    )
                    break
            }
            return null
        })

        let output = [
            "<span class='text-primary h4'>[" + this.name + ']</span>',
            this.description,
        ]

        if (itemList.length > 0) {
            output.push("<b class='text-primary'>Items here:</b>")
            output.push(itemList.sort().join(''))
        }

        if (beingList.length > 0) {
            output.push("<b class='text-primary'>Beings here:</b>")
            output = output.concat(beingList.sort())
        }

        output.push("<b class='text-primary'>Visible Exits:</b>")
        if (exitList.length > 0)
            output = output.concat(exitList.sort().join(''))
        else output.push('None')

        return output.join('\n')
    }
}

export default Room
