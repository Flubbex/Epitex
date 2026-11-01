import room from './room'
import enemy from './enemy'

import actionConstructor from './action'

const constructContent = (API) => {
    const action = actionConstructor(API)

    return {
        info: {
            name: 'Adventure Game',
            description: 'Save the tribe (Or something)',
            startRoom: 'HJWH3N',
        },
        room,
        enemy,
        action,
    }
}

export default constructContent
