
const constructContent = (API) => {

    const room = [
        {
            id:"MainMenu",
            name:"Main Menu",
            type:"room",
            description:"Hi it's vince with slap chop",
            parent:"NULLED",
            event:{
                playerEntered:["wow"]
            },
            content:[
                {
                    id:"Smoker",
                    name:"Start",
                    target:"1",
                    type:"exit",
                    tag:["silent","clear"],
                    locked:true
                },
                {
                    name:"Gay Key",
                    type:"key",
                    target:"Smoker"
                }
            ]
        },
        {
            id:"1",
            name:"Game",
            type:"room",
            description:"Wow",
            parent:"NULLED",
            content:[
                { name:"Super Dildo",
                    description:"Poop me!",
                    type:"item",
                    action:{"poop":"poop"},
                    event:{
                        playerViewed:["coolbeans"]
                    }
                }
            ]
        }
    ]

    const command = {
        test:([a])=>{
            API.print("Hi!",a)
        }
    }

    const action = {
        poop:(self,a)=>{
            API.print("Uguuu triggered from "+self.name,a)
            self.name = "Dirty Dildo"
        }
    }

    const event = {
        coolbeans:()=>{
            API.print("Hottie")
        },
        wow:()=>{
            API.playMusic("https://www.youtube.com/embed/GLGfQn8dsXQ?si=v4winlj15jQ7F8Dk&autoplay=1")
        }
    }

    return {
        info:{
            name:"Testbed",
            description:"Testing 4 aids",
            startRoom:"MainMenu"
        },
        room,
        command,
        action,
        event
    }
}

export default constructContent