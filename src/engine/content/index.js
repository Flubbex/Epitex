//Bomb-ass logo generated using https://patorjk.com/software/taag/

import commandConstructor from './command'

const banana = `<img src='img/banana.gif' onClick="game.handle('bananaclicked',true)" width="64" height="64" style="display:inline;hover:cursor;"/>`
const epiTextLogo = `                                        
 ▄▄▄▄▄▄▄▄               ██                                  
 ██▀▀▀▀▀▀               ▀▀       ██                         
 ██        ██▄███▄    ████     ███████    ▄████▄   ▀██  ██▀ 
 ███████   ██▀  ▀██     ██       ██      ██▄▄▄▄██    ████   
 ██        ██    ██     ██       ██      ██▀▀▀▀▀▀    ▄██▄   
 ██▄▄▄▄▄▄  ███▄▄██▀  ▄▄▄██▄▄▄    ██▄▄▄   ▀██▄▄▄▄█   ▄█▀▀█▄  
 ▀▀▀▀▀▀▀▀  ██ ▀▀▀    ▀▀▀▀▀▀▀▀     ▀▀▀▀     ▀▀▀▀▀   ▀▀▀  ▀▀▀ 
           ██                                               
    v0.2                         made by Flubber  ${banana}
`

/**
 * Sets up base content required by the engine, along with some fun stuff.
 * @param {*} API
 * @returns Base content Pack
 */
const engineContentConstructor = (API) => {
    const room = [
        {
            id: 'NULLED',
            type: 'room',
            name: 'Null Room',
            description: 'You find yourself in a place beyond space and time.',
        },
        {
            id: 'LoaderMenu',
            type: 'menu',
            name: 'Load Screen',
            description: epiTextLogo,
            script: {
                playerViewed: `
                    API.print('')
                    API.print('Available adventures:')
                    const packSet = API.getContentPackSet()
                    packSet.map((pack) => {
                        const { name } = pack.info
                        API.print(
                            \`<button onClick="game.handle('loadGame \${name}',true)">\${name}</button>\`
                        )
                    })
                    `,
            },
        },
    ]

    const bananaClicked = () => {
        API.print('Why you touching my banana bro?')
    }

    const loadGame = (gameSplit) => {
        const game = gameSplit.join(' ')
        API.loadGamePack(game)
    }

    /**
     * Return an item given to an npc, this is default behaviour to prevent silliness
     */
    const returnToPlayer = (npc, item) => {
        npc.remove(item)
        API.print(`"I'm not sure what to do with this" ${npc.name} says`)
        API.print(`"They hand you back your ${item.name}`)
        API.player().add(item)
    }

    const command = {
        ...commandConstructor(API),
        ...{ loadgame: loadGame, bananaclicked: bananaClicked },
    }
    return {
        info: {
            name: 'Base content pack',
            description:
                'Basic content every text adventure engine should never go without.',
            version: 1,
            startRoom: 'LoaderMenu',
        },
        room,
        enemy: [],
        item: [],

        quest: {},
        command,
        action: {},
    }
}
export default engineContentConstructor
