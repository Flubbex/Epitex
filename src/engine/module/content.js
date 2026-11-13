import Emitter from '../class/emitter'

export default class ContentModule extends Emitter {
    library = {}
    game = {}
    currentPack = null 

    constructor(contentPackSet) {
        super()
        window.dbg("ContentModule","Constructing")

        const boundLoadPack = this.loadPack.bind(this)
        contentPackSet.map(boundLoadPack)
    }

    loadPack(pack){
        window.dbg("ContentModule",`Loading pack ${pack.info.name}`)
        this.library[pack.info.name] = pack 
        
        if (pack.game)
            this.game[pack.game.name] = pack.game
    }

    loadDependency(name){
        const depInfo = this.library[name]
        if (!depInfo)
            throw new Error(`Tried loading invalid dependency "${name}"`)
        else
            window.dbg("ContentModule",`Loading dependency '${name}'`)
        return depInfo
    }
    createGame(name){
        const gameInfo = this.game[name]

        if (!gameInfo)
            throw new Error(`Tried creating a nonexistant game "${name}"`)

        const dependencies = {}

        if (gameInfo.depend)
            gameInfo.depend.map((depName)=> {
                const dep = this.loadDependency(depName)
                const keys = Object.keys(dep).filter((e) => ['info','game'].indexOf(e) === -1)
                keys.map((k) => dependencies[k] = dependencies[k] ? [...dependencies[k], ...dep[k]] : dep[k] )
            })

        //Always load base content first
        const newGame = {...this.library["Base"],
                         ...dependencies,
                         ...gameInfo}

        return newGame
    }

}
