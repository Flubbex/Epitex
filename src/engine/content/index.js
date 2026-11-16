//Bomb-ass logo generated using https://patorjk.com/software/taag/

import commandConstructor from "./command"

const banana = {
    type: "img",
    src: "img/banana.gif",
    command: "bananaclicked",
    width: "64",
    height: "64",
    style: { display: "inline", cursor: "pointer" },
}

const epiTextLogo = `                                        
 ▄▄▄▄▄▄▄▄               ██                                  
 ██▀▀▀▀▀▀               ▀▀      ██                         
 ██        ██▄███▄    ████    ███████   ▄████▄   ▀██  ██▀ 
 ███████   ██▀  ▀██     ██      ██     ██▄▄▄▄██    ████   
 ██        ██    ██     ██      ██     ██▀▀▀▀▀▀    ▄██▄   
 ██▄▄▄▄▄▄  ███▄▄██▀  ▄▄▄██▄▄▄   ██▄▄▄  ▀██▄▄▄▄█   ▄█▀▀█▄  
 ▀▀▀▀▀▀▀▀  ██ ▀▀▀    ▀▀▀▀▀▀▀▀    ▀▀▀▀    ▀▀▀▀▀   ▀▀▀  ▀▀▀ 
           ██                                               
`

const subText = {
    type: "span",
    content: [
        { type: "span", content: "    v0.9              Made by Flubber     " },
        banana,
    ],
}

/**
 * Sets up base content required by the engine, along with some fun stuff.
 * @param {*} API
 * @returns Base content Pack
 */
const engineContentConstructor = (API) => {
    const r = (min, max) => Math.random() * (max-min) + min

    const rainbow = (input) => {
        return input.split("").map((content) => {
            const randomColor = `rgb(${r(64, 192)},${r(64, 192)},${r(64, 192)})`
            return { type: "span", style: { color: randomColor }, content }
        })
    }

    const description = {
        type: "div",
        content: rainbow(epiTextLogo).concat(subText),
    }

    const room = [
        {
            id: "NULLED",
            type: "room",
            name: "Null Room",
            description: "You find yourself in a place beyond space and time.",
        },
        {
            id: "LoaderMenu",
            type: "menu",
            name: "Load Screen",
            description,
            script:`
                const r = (min, max) => Math.random() * (max-min) + min
                const randomColor = 
                this.on("object_presented",async ([msg])=>{
                    console.log(msg)
                    for (let i=0;i<25;i++) {
                        await util.delay(i*5)
                        msg.content.slice(0,-1).map((span)=>{
                            const color = \`rgb(\${r(64, 192)},\${r(64, 192)},\${r(64, 192)})\`
                            span.set("style",{color})
                        })
                    }
                })
            `
        },
    ]

    const bananaClicked = () => {
        API.print("Why you touching my banana bro?")
    }

    const loadGame = (gameSplit) => {
        const game = gameSplit.join(" ")
        API.loadGamePack(game)
    }

    /**
     * Return an item given to an npc, this is default behaviour to prevent silliness
     
    const returnToPlayer = (npc, item) => {
        npc.remove(item)
        API.print(`"I'm not sure what to do with this" ${npc.name} says`)
        API.print(`"They hand you back your ${item.name}`)
        API.player().add(item)
    }
    */

    const command = {
        ...commandConstructor(API),
        ...{ loadgame: loadGame, bananaclicked: bananaClicked },
    }

    return {
        room,
        command,
        info: {
            type: "game",
            version: 1,
            name: "Base",
            description: "Base content + A main menu",
            startRoom: "LoaderMenu",
            script: `
            const printMenu = () => {
                print({type:"span",className:"bold",content:'Available adventures:'})
                const allGames = getAvailableGames()
                const packSet = Object.keys(allGames).map((e)=>allGames[e].info.name)
                packSet.map((pack) => 
                    print(
                        {type:"button",className:"btn",onClick:()=>engine.start(pack),content:pack }
                    )
                )
                print("\\n")
                print( {type:"span",className:"bold",content:"Or if you're feeling a little more adventurous.."})
                print({type:"button",className:"btn",content:"Create a new game",onClick:()=>engine.new()})
                print({type:"button",className:"btn",content:"Load a game from a file",onClick:()=>engine.fromFile()})
            }

            const clear = () => {
                API.clear()    
            }
            connect("LoaderMenu","object_viewed", ()=>window.setTimeout(printMenu,0) )
            `,
        },
    }
}
export default engineContentConstructor
