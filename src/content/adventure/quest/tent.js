
const constructQuest = (API) => {
    const delay = API.util.delay 

    const yourTentInit = async (room,ent) => {
        if (API.questFlag("main")>0)
            return
        ent.locked = true
        ent.lockedMessage = "You need a bit more time to wake up"
        await delay(1000)
        room.echo("You wake up from a turbulent sleep, feeling somewhat groggy.")
        await delay(2000)
        room.echo("You peek outside your tent and notice the sun has been up for a while.")
        await delay(2000)
        room.echo("A slight moan escapes your mouth as you realize you were supposed to be running errands today and the village elder will have your head for sleeping in late again.")
        await delay(3000)
        room.echo("It would probably be best to go see him as soon as possible.")
        await delay(2000)
        room.echo("You throw on some clothes and get ready to leave.")
        ent.locked = false    
        ent.lockedMessage = "You feel compelled to stay where you are"

        API.questFlag("main",1)
    }

    return {
        yourTentInit
    }
}

export default constructQuest