const commandConstructor = (API) => {
    const create = (arg) => {
        const player = API.player()

        if (!arg) return "What would you like to create?"
        let data = null
        try {
            data = JSON.parse(arg.join(" "))
        } catch {
            return "You have entered a malformed JSON string"
        }
        const newItem = API.create(data)
        player.add(newItem)
        return (
            "Created " +
            newItem.type +
            " '" +
            newItem.name +
            "' (#" +
            newItem.id +
            ")"
        )
    }

    const remove = ([target]) => {
        const plyRoom = API.room()
        plyRoom.remove(
            plyRoom.get("any", target) || API.player().get("any", target)
        )
        return "Removed " + target
    }

    const cardinalOpposite = {
        north: "South",
        east: "West",
        south: "North",
        west: "East",
        northeast: "Southwest",
        northwest: "Southeast",
        southwest: "Northeast",
        southeast: "Northwest",
        up: "Down",
        down: "Up",
    }

    const tunnel = ([direction = "", id = 0]) => {
        if (!direction || !cardinalOpposite[direction.toLowerCase()])
            return "Please enter at least a proper cardinal direction"

        const plyRoom = API.room()
        let otherRoom = id ? API.get(id) : null

        if (!otherRoom) {
            otherRoom = API.create("room")
        }

        API.print(
            "Tunneling " +
                direction +
                " from " +
                plyRoom.name +
                " to " +
                otherRoom.name
        )
        API.handle("dig " + direction + " " + otherRoom.id)
        API.handle(
            "dig " +
                cardinalOpposite[direction.toLowerCase()] +
                " " +
                plyRoom.id +
                " " +
                otherRoom.id
        )
    }

    const dig = ([direction = "", id, from]) => {
        const playerRoom = from ? API.get(from) : API.room()
        if (direction === "") return "Dig to where?"
        if (playerRoom.get("exit", direction)) return "That exit already exists"

        if (id == null) {
            const newRoom = API.create("room")
            playerRoom.content.push(
                API.create({
                    type: "exit",
                    name: direction,
                    target: newRoom.id,
                })
            )
            return (
                "You dig a new room towards " +
                direction +
                " with ID #" +
                newRoom.id
            )
        } else {
            if (API.get(id)) {
                playerRoom.content.push(
                    API.create({ type: "exit", name: direction, target: id })
                )
                return "Digging an exit to Room #" + id
            } else return "No such room to link"
        }
    }

    const edit = ([name, prop, _val]) => {
        if (!name || !prop)
            return "You entered an invalid amount of arguments (edit [THING|HERE|SELF|GAME] [PROPERTY] [VALUE])"
        let val = _val

        const player = API.player()
        const room = API.room()
        const game = API.game()
        let target = null

        switch (name) {
            case "game":
                target = game
                break
            case "here":
                target = room
                break
            case "self":
                target = player
                break
            default:
                target = API.find(name)
        }
        if (!target) return "You entered an invalid target"
        if (Array.isArray(target))
            return [
                "Ambigious target, did you mean any of these?",
                ...target.map((o) => o.name),
            ]

        if (prop === "topad") {
            API.setNotepad(JSON.stringify(target,null,2))
            return "Sent object bones to notepad"
        }
        else if (prop === "frompad") {
            let propSet
            try {
                propSet = JSON.parse(API.notepad())
            } catch (err){
                return "Malformed JSON in notepad"
            }

            for (var k in propSet)
                target[k] = propSet[k]

            return "Loaded bones from notepad"
        }

        if (parseFloat(val).toString() !== "NaN") val = parseFloat(val)

        try {
            val = JSON.parse(_val)
        } catch(err){

        }

        target[prop] = val

        if (name === "game")
            API.save()

        if (target.look)
            return target.look()
        else 
            return "Modification succesful"
    }

    const runpad = () => {
        API.print("Running notepad as script..")
        API.handle(API.notepad())
    }

    const patch = (jsonStringSet) => {
        const fullString = jsonStringSet.join(" ")
        return API.patch(fullString)
    }

    const gexp = ([filename]) => {
        API.exportPack(filename)
        return "Exported game"
    }

    const gexpn = () => {
        API.setNotepad( API.exportPack(null,false) )
        return "Exported game to notepad"
    }

    const gimp = async () => {
        const [handle] = await API.createUpload()
        const file = await handle.getFile()
        const text = await file.text()
        const data = JSON.parse(text)

        API.importPack(data)
    }

    const script = ([targetName, command]) => {
        if (!targetName) return "Script what?"

        let target = null

        if (targetName === "game") target = API.game().script
        else if (targetName === "here") target = room
        else target = API.find(targetName)
        

        if (target === null) return "Can't find that"

        if (!target.script)
            target.script = ""

        if (!command)
            return target.script
                    .split("\n")
                    .map((e, n) => `${n + 1}\t${e}`)
                    .join("\n")
        
        else if (command === "edit"){
            API.setNotepad(target.script)
            return "Sent script to notepad"
        }
        else if (command = "load"){
            target.script = API.notepad()
            if (targetName !== "game")
                API.runObjectScript(target)
            else {
                API.save()
                API.start(API.game().info.name)
            }
            return "Loaded content from notepad as script"
        }
    }

    const del = ([name]) => {
        const item = API.find(name)
        if (!item)
            return "Delete what?"

        API.del(item)
        
        return `Deleted the ${name}`
    }

    const savesnap = ([slot=1]) => {
        const snapshot = API.game().save()
        snapshot.type = "snapshot"
        snapshot.id += `#${slot}`

        return API.save(snapshot)
    }

    const loadsnap = ([slot=1]) => {
        return API.start(API.game().id+"#"+slot)
    }
    

    return {
        savesnap,
        loadsnap,
        edit,
        dig,
        tunnel,
        create,
        remove,
        runpad,
        patch,
        gexp,
        gexpn,
        gimp,
        script,
        del
    }
}

export default commandConstructor
