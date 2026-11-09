const commandConstructor = (API) => {
    const warp = (exit) => {
        const nextRoom = API.get(exit.target)

        if (!nextRoom) {
            console.warn(exit, 'Tried moving to an invalid room', exit.target)
            return 'Something goofy happened'
        }

        if (exit.locked) return 'That exit is locked'

        API.player().move(nextRoom, API.room())
        if (exit.tag.indexOf('silent') === -1)
            API.print('You walk towards the ' + exit.name.toLowerCase())
        if (exit.tag.indexOf('clear') !== -1) API.clear()
        return nextRoom.look()
    }

    const go = ([direction = '']) => {
        const player = API.player()
        if (player.locked) return player.lockedMessage

        const playerRoom = API.room()
        const exitList = playerRoom.get('exit', direction)

        if (!exitList) return 'Go where?'

        if (Array.isArray(exitList))
            return ['Ambigious exit, did you mean any of these?'].concat(
                exitList.map((e) => e.name)
            )

        if (!exitList.target) {
            console.warn('Exit is missing a target:', exitList)
            return 'Something goofy happened'
        }

        return warp(exitList)
    }

    const look = ([targetName]) => {
        const room = API.room()
        let target = room

        if (targetName)
            target =
                room.get('any', targetName) ||
                API.player().get('any', targetName)

        if (!target) return 'What do you want to look at?'

        if (Array.isArray(target))
            return ['Which of these do you want to look at:'].concat(
                target.map((e) => e.name)
            )

        return target.look()
    }

    const take = ([target]) => {
        const plyRoom = API.room()
        const item = plyRoom.get('any', target)
        if (!item) return 'What do you want to take?'
        if (item.length)
            return ['Ambigous item name, did you mean any of these?'].concat(
                item.map((i, k) => k + 1 + '. ' + i.name)
            )
        API.player().add(item)
        plyRoom.remove(item)
        return 'You pick up the ' + item.name
    }

    const drop = ([target]) => {
        const plyRoom = API.room()
        const item = API.player().get('any', target)
        if (!item) return 'What do you want to drop?'
        if (item.length)
            return ['Ambigous item name, did you mean any of these?'].concat(
                item.map((i) => i.name)
            )
        plyRoom.add(item)
        API.player().remove(item)
        return 'You dropped the ' + item.name
    }

    const inventory = () => {
        const output = ['You are currently carrying:']
        const item = API.player().content.map((i) => i.name)
        return [].concat(output, item.length > 0 ? item : 'Nothing')
    }

    const say = (message) => {
        return "You say: '" + message.join(' ') + "'"
    }

    const score = () => {
        return API.player().score()
    }

    const attack = ([target]) => {
        const plyRoom = API.room()
        const being = plyRoom.get('any', target)

        if (!being) return 'Attack what?'
        if (being.length)
            return ['Ambigious target, did you mean any of these?'].concat(
                being.map((i) => i.name)
            )
        if (!being.health) return "You can't attack the " + being.name

        API.fight(being)
    }

    const recall = () => {
        API.player().room = 'NULLED'
        API.handle('look', true)
    }

    const sleep = () => {
        return 'You sleep, like a fatass.'
    }

    const unlock = ([target]) => {
        if (!target) return 'Unlock what?'

        const room = API.room()
        const targetItem = room.get('any', target)

        if (!targetItem) return `You don't see a ${target} here`

        if (!targetItem.locked)
            return `The ${targetItem.name} doesn't seem locked`

        const key = API.playerGetKey(targetItem.id)

        if (!key) return "You don't seem to have the key"

        targetItem.locked = false

        return `You unlock the ${targetItem.name} using the ${key.name}`
    }
    return {
        look,
        l: look,
        go,
        take,
        t: take,
        get: take,
        inventory,
        i: inventory,
        drop,
        d: drop,
        say,
        score,
        attack,
        kill: attack,
        recall,
        sleep,
        unlock,
    }
}
export default commandConstructor
