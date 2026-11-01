const actionConstructor = (API) => {
    const collectPoop = () => {
        if (API.questFlag('villageElderQuest') > 1)
            return "You really don't feel like digging through any more of that muck"
        if (API.questFlag('villageElderQuest') !== 1)
            return "You don't quite know how to do that"

        const bowl = API.player().get('any', 'bowl')
        if (!bowl)
            return "You don't seem to have any means of collecting the doodoo"

        bowl.name = 'Wooden Bowl (Filled with bat crap)'
        bowl.description =
            "This bowl is filled with bat crap and smells about as good as you'd imagine."

        API.questFlag('villageElderQuest', 2)
        return 'You collect a nice big helping of bat feces into the bowl, this should be more than enough to please Makar.'
    }

    const playerTentSleep = () => {
        if (API.questFlag('main') === 2) return 'You take a nice nap'
        else return "You don't really feel like sleeping"
    }

    return { playerTentSleep, collectPoop }
}
export default actionConstructor
