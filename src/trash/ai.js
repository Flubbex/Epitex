class AiController {
    constructor(aiCall) {
        this.call = aiCall
        this.entities = []
        window.dbg('AiController', 'init')
    }

    spawn(ent) {
        this.entities.push(ent)
    }

    update(game, ent) {
        this.call[ent.script](game, ent)
    }

    tick(game) {
        this.entities.map((e) => this.update(game, e))
    }
}

export default AiController
