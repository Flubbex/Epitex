import room from "./room"
import enemy from "./enemy"

import eventConstructor     from "./event"
import questConstructor     from "./quest"
import actionConstructor    from "./action"

const constructContent = (API) => {
    const event     = eventConstructor(API)
    const quest     = questConstructor(API)
    const action    = actionConstructor(API)

    return {
        info:{
            name:"Adventure Game DX",
            description:"Save the tribe (Or something)",
            startRoom:"MainMenu"
        },
        room,
        enemy,
        event,
        quest,
        action
    }
}

export default constructContent