import Emitter from "../class/emitter"

export default class ContentModule extends Emitter {
    library = {}
    game = {}
    currentPack = null

    constructor(contentPackSet) {
        super()
        window.dbg("ContentModule", "Constructing")

        const boundLoadPack = this.loadPack.bind(this)
        contentPackSet.map(boundLoadPack)
    }

    loadPack(pack) {
        window.dbg("ContentModule", `Loading pack ${pack.info.name}`)

        if (pack.info.type === "game") this.game[pack.info.name] = pack
        else if (pack.info.type === "library")
            this.library[pack.info.name] = pack
        else {
            console.log(pack)
            throw new Error("Tried loading a pack with an invalid type")
        }
    }

    loadDependency(name) {
        const depInfo = this.library[name] || this.game[name]
        if (!depInfo)
            throw new Error(`Tried loading invalid dependency "${name}"`)
        else window.dbg("ContentModule", `Loading dependency '${name}'`)
        return depInfo
    }

    gameExists(name){
        return this.game.hasOwnProperty(name)
    }
    createGame(name) {
        window.dbg("ContentModule", `Creating game "${name}"`)
        const game = this.game[name]

        if (!game)
            throw new Error(`Tried creating a nonexistant game "${name}"`)

        let dependencies =
            game.info.depend?.map((depName) => this.loadDependency(depName)) ||
            []

        //Always load base content first
        dependencies.push(this.loadDependency("Base"))

        //If we're not constructing base content, load the pack as its own dependency
        if (name !== "Base") dependencies.push(game)

        const newGame = {  }

        dependencies.map((dep) => {
            const contentKey = Object.keys(dep.content)
            contentKey.map((key) => {
                const contentPart = dep.content[key]
                if (!newGame[key]) 
                    newGame[key] = contentPart

                else if (Array.isArray(newGame[key]))
                    newGame[key] = newGame[key].concat( contentPart )

                else newGame[key] = { ...newGame[key], ...contentPart }
            })
        })

        newGame.info = game.info

        newGame.id = game.id || Math.floor(Math.random() * 1000)

        console.log(newGame)

        return newGame
    }
}
