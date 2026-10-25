const eventConstructor = (API) => {
    
    const clearStart = () => {
        API.clear()
        API.handle("look",true)
    }
    
    const villageElderQuest = (room,ent) => {
        switch(API.questFlag("villageElderQuest")){
            case null:
                API.questFlag("villageElderQuest","quest_in_progress")
                API.startQuest("villageElderQuest1",room,ent)
                break
            case 1: //Waiting for the poop bowl
                API.startQuest("villageElderQuest1B",room,ent)
                break
            case 2: //Poop bowl in inventory
                API.questFlag("villageElderQuest","quest_in_progress")
                API.startQuest("villageElderQuest2",room,ent)
                break
            
        }
    }

    const yourTentInit = (room,ent) => {
        API.startQuest("yourTentInit",room,ent)
    }

    const setup = () => {
        API.player().home = "HYX9OP"
    }

    return  {clearStart,setup, yourTentInit,villageElderQuest}
}

export default eventConstructor