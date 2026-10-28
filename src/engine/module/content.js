import Emitter from '../class/emitter'

export default class ContentModule extends Emitter {
    contentPackSet = []

    content = {
        room: [],
        enemy: [],
        item: [],

        quest: {},
        event: {},
        command: {},
        action: {},
    }

    constructor(contentPackSet) {
        super()
        this.contentPackSet = contentPackSet
        window.dbg(
            'ContentModule',
            `Constructed with ${this.contentPackSet.length} pack(s) of content`
        )
    }

    reset() {
        window.dbg('ContentModule', 'Resetting')
        this.content = {
            room: [],
            enemy: [],
            item: [],

            quest: {},
            event: {},
            command: {},
            action: {},
        }
    }

    load(contentPack) {
        window.dbg('ContentModule', 'Loading content:', contentPack.info.name)
        for (const key in contentPack) {
            if (key in this.content)
                if (Array.isArray(this.content[key]))
                    this.content[key] = this.content[key].concat(
                        contentPack[key]
                    )
                else
                    this.content[key] = Object.assign(
                        {},
                        this.content[key],
                        contentPack[key]
                    )
            else if (key !== 'info')
                console.warn(`Pack contains unrecognized material: '${key}' `)
        }
    }

    loadPack(name) {
        window.dbg('ContentModule', 'Loading pack:', name)
        const contentPack = this.contentPackSet.find(
            (e) => e.info.name === name
        )

        if (!contentPack)
            throw new Error(
                `Tried loading a non-existant content pack "${name}" `
            )

        this.load(contentPack)

        return contentPack
    }

    get(type, name) {
        if (!type) return this.content

        if (!name) return this.content[type]

        return this.content[type][name]
    }

    newGame(_gamePackInfo) {
        const gamePackInfo = _gamePackInfo || {
            name: 'Fallback mode',
            description: 'You probably should not be running in this mode',
            startRoom: 'NULLED',
        }

        window.dbg(
            'ContentModule',
            'Creating new game based on pack:',
            gamePackInfo.name
        )
        return {
            world: {
                room: this.content.room,
            },
            enemy: this.content.enemy,
            event: this.content.event,
            quest: this.content.quest,
            item: this.content.item,
            command: this.content.command,
            action: this.content.action,
            gamePackInfo,
        }
    }
}
