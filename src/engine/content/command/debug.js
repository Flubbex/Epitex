const commandConstructor = (API) => {
    const util = API.util

    const dumpsave = () => {
        console.log(JSON.stringify(API.generateSave()))
    }

    const dump = ([targetName]) => {
        const plyRoom = API.room()
        const target = targetName
            ? plyRoom.get("any", targetName) ||
              API.player().get("any", targetName)
            : plyRoom

        return { type: "div", content: JSON.stringify(target, null, 2) }
    }

    function objectToCode(obj) {
        return JSON.stringify(obj, null, 2)
            .replace(/"([^"]+)":/g, "$1:") // Remove quotes from property names
            .replace(/"([^"]*)"/g, '"$1"') // Replace double quotes with single quotes
    }

    const save = () => {
        API.save()
    }

    const reset = () => {
        if (!API.resetLock) {
            API.resetLock = 1
            return "Warning: This will delete everything. If you're sure, reset again."
        }
        API.reset()
        return "Refreshing.."
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

        return "Synced room #" + plyRoom.id + " with original from content"
    }

    const question = () => {
        API.print("What is your name?")
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
