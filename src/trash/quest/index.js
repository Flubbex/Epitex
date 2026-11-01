import makarQuestConstructor from './makar'
import tentQuestConstructor from './tent'

const constructQuest = (API) => {
    const makarQuestLine = makarQuestConstructor(API)
    const tentQuestLine = tentQuestConstructor(API)

    return Object.assign({}, makarQuestLine, tentQuestLine)
}

export default constructQuest
