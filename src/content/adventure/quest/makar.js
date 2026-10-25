
const constructQuest  = (API) => {

    const delay = API.util.delay 
    
    const villageElderQuest2 = async (room,ent) => {
        await delay(1000)
        room.echo("As you enter Makar's tent his smile lights up instantly from the putrid smell eminating from your bowl of bat crap.")
        await delay(2000)
        room.echo("'Well done! I'll be more than happy to take this off your hands now' Makar says as he happily tugs the bowl from your hands.")
        
        ent.remove(ent.get("any","Wooden Bowl"))
        await delay(2000)
        room.echo("Makar takes a particularly large helping of bat excrement in his hand and wastes no time munching it down.")
        await delay(3000)
        room.echo("Within minutes, Makar's pupils grow intensely black as he lays down on his bed roll, giggling like a madman.")
        await delay(3000)
        room.echo("You're not quite sure what to make of the situation but at least you completed your errand.")
        
        
        room.get("any","Makar").idleMessage = ["continues to giggle like a madman"]
        API.questFlag("villageElderQuest",3)
        API.questFlag("main",2)
    }

    const villageElderQuest1 = async (room,ent) => {
        await delay(1000)
        room.echo("The village elder looks at you with a sigh of relief.")
        await delay(2000)
        room.echo("'Good to see you've finally managed to get out of bed' Makar grumbles.")
        await delay(2000)
        room.echo("'I have a particularly special task for you today.'")
        await delay(2000)
        room.echo("He points his cane to the north of his tent")
        await delay(2500)
        room.echo("'North of the village is a large cave, home to a special kind of bat.'")
        await delay(2000)
        room.echo("'I need you to go over there and collect me a nice, big bowl of their poop.'")

        await delay(2500)    
        const bowl = {type:"item",name:"Wooden bowl",
        description:"An ordinary bowl, bestowed upon you by the village elder,destined to be filled with bat excrement."}
        ent.add(API.create(bowl))
        room.echo("He hands you a simple wooden bowl")

        await delay(2000)
        const lantern = {type:"item",name:"Lantern",
        description:"A small lantern made from waxed wood, it emits a fair amount of light.",
        tag:["light"]}
        ent.add(API.create(lantern))
        room.echo("'Be warned that the inside of the cave can be a bit dimly lit around this time, this lantern should come in handy.'")
        
        await delay(2000)
        room.echo("He hands you a small lantern, the candle inside flickers in the wind.")
        await delay(2500)
        room.echo("'Now get to it. If the bats give you any sort of trouble, find a nice big rock and deal with them.'")
        await delay(2000)
        room.echo("Makar continues along his business, leaving you with your thoughts.")

        API.questFlag("villageElderQuest",1)
    }

    const villageElderQuest1B = async  (room) =>{
        await delay(1000)
        room.echo("Makar looks at you with an air of impatience..")
        await delay(2000)
        room.echo("'Have you gotten me that bowl of bat poop yet?' he asks. ")
    }

    return {villageElderQuest1,
            villageElderQuest1B,
            villageElderQuest2}
}

export default constructQuest