const commandConstructor = (API) => {
    const util = API.util

    const dumpsave = () => {
        console.log(JSON.stringify(API.generateSave()))
    }

    const dump = ([target]) => {
        const plyRoom = API.room()
        return target
            ? plyRoom.get('any', target) || API.player().get('any', target)
            : plyRoom
    }

    function objectToCode(obj) {
        return JSON.stringify(obj, null, 2)
            .replace(/"([^"]+)":/g, '$1:') // Remove quotes from property names
            .replace(/"([^"]*)"/g, '"$1"') // Replace double quotes with single quotes
    }

    const save = ([_area]) => {
        const area = parseInt(_area)
        const plyRoom = API.room()
        const withoutPlayer = Object.assign(
            {},
            util.cleanObject(plyRoom.toJSON()),
            { content: plyRoom.content.filter((e) => e.type !== 'player') }
        )
        let roomWithoutPlayer = API.filterRoom((r) =>
            r.id === plyRoom.id ? withoutPlayer : r
        )
        if (area.toString() !== 'NaN')
            roomWithoutPlayer = roomWithoutPlayer.filter((r) => r.area === area)
        const code = objectToCode(roomWithoutPlayer)
        const contentEntry = 'const room = ' + code + '\n\nexport default room'
        navigator.clipboard.writeText(contentEntry)

        const size = new Blob([code]).size / 1000
        return 'Saved world to clipboard (' + size + ' kb)'
    }

    const reset = () => {
        if (!API.resetLock) {
            API.resetLock = 1
            return "Warning: This will delete everything. If you're sure, reset again."
        }
        API.reset()
        return 'Refreshing..'
    }

    const sync = () => {
        const plyRoom = API.room()
        const fromData = API.create(
            content.base.world.room.find((e) => e.id === plyRoom.id)
        )
        fromData.add(API.player())
        API.overrideRoom(
            API.mapRoom((e) => (e.id === plyRoom.id ? fromData : e))
        )

        return 'Synced room #' + plyRoom.id + ' with original from content'
    }

    const question = () => {
        API.print('What is your name?')
        API.inputPrompt((input) => {
            API.player().name = input
            API.inputPrompt(null)
            return "Alright, set your name to '" + input + "'"
        })
    }

    const flag = ([target, state]) => {
        if (!target) return API.questFlag()
        else if (!state) {
            API.questFlag(target, null)
            return "Set flag '" + target + "' to null"
        } else {
            API.questFlag(target, parseFloat(state))
            return "Set flag '" + target + "' to " + state
        }
    }

    return {
        dumpsave,
        dump,
        save,
        reset,
        sync,
        question,
        flag,
    }
}

export default commandConstructor
