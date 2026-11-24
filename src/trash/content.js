import Emitter from "../class/emitter"

export default class ContentModule extends Emitter {
    library = {}
    game = {}
    
    byName = {}


    constructor(contentPackSet) {
        super()
        window.dbg("ContentModule", "Constructing")

        const boundLoadPack = this.loadPack.bind(this)
        contentPackSet.map(boundLoadPack)
    }

    loadPack(pack) {
        window.dbg("ContentModule", `Loading pack ${pack.info.name}`)

        if (!pack.id)
            pack.id = crypto.randomUUID()

        if (pack.info.type === "game") this.game[pack.id] = pack
        else
            this.library[pack.id] = pack

        if (this.byName[pack.info.name])
            console.warn("Loading pack with a name that already exists, this will cause an override")

        this.byName[pack.info.name] = pack
 
    }

    loadDependency(nameOrId) {
        const dependency = this.get(nameOrId)
        if (!dependency)
            throw new Error(`Tried loading invalid dependency "${nameOrId}"`)
        else window.dbg("ContentModule", `Loading dependency '${dependency.info.name}'`)
        return dependency
    }

    exists(nameOrId){
        return this.get(nameOrId) !== null
    }

    libraryExists(nameOrId){
        return this.byName.hasOwnProperty(nameOrId) || this.library.hasOwnProperty(nameOrId)
    }
    gameExists(nameOrId){
        return this.byName.hasOwnProperty(nameOrId) || this.game.hasOwnProperty(nameOrId)
    }

    get(nameOrId){
        return this.byName[nameOrId] || this.game[nameOrId] || this.library[nameOrId]
    }

    createGame(nameOrId) {
        const game = this.get(nameOrId)

        if (!game)
            throw new Error(`Tried creating a nonexistant game "${nameOrId}"`)

        window.dbg("ContentModule", `Creating game "${game.info.name}"`)

        let dependencies =
            game.info.depend?.map((depName) => this.loadDependency(depName)) ||
            []

        //Always load base content first
        dependencies.push(this.loadDependency("Base"))

        //If we're not constructing base content, load the pack as its own dependency
        if (game.info.name !== "Base") dependencies.push(game)

        const newGame = { 
            id:game.id
         }

        dependencies.map((dep) => {
            const contentKey = Object.keys(dep.content)
            contentKey.map((key) => {
                const contentPart = dep.content[key]
                if (!newGame[key]) 
                    newGame[key] = contentPart

                else if (Array.isArray(newGame[key]))
                    newGame[key] = newGame[key].concat( contentPart )

                else if (typeof newGame[key] === 'object') 
                    newGame[key] = { ...newGame[key], ...contentPart }

                else 
                    console.warn(`Potential overlap during dependency load on key "${key}",value: ${newGame[key]}, overload: ${contentPart}`)
            })
        })

        newGame.info = game.info

        window.dbg("ContentModule",newGame)

        return newGame
    }
}
