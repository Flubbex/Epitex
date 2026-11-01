const commandConstructor = (API) => {
    const create = (arg) => {
        const player = API.player()

        if (!arg) return 'What would you like to create?'
        let data = null
        try {
            data = JSON.parse(arg.join(' '))
        } catch {
            return 'You have entered a malformed JSON string'
        }
        const newItem = API.create(data)
        player.add(newItem)
        return (
            'Created ' +
            newItem.type +
            " '" +
            newItem.name +
            "' (#" +
            newItem.id +
            ')'
        )
    }

    const remove = ([target]) => {
        const plyRoom = API.room()
        plyRoom.remove(
            plyRoom.get('any', target) || API.player().get('any', target)
        )
        return 'Removed ' + target
    }

    const cardinalOpposite = {
        north: 'South',
        east: 'West',
        south: 'North',
        west: 'East',
        northeast: 'Southwest',
        northwest: 'Southeast',
        southwest: 'Northeast',
        southeast: 'Northwest',
    }
    const tunnel = ([direction = '', id = 0]) => {
        if (!direction || !cardinalOpposite[direction.toLowerCase()])
            return 'Please enter at least a proper cardinal direction'

        const plyRoom = API.room()
        let otherRoom = id ? API.get(id) : null

        if (!otherRoom) {
            otherRoom = API.create('room')
            API.addRoom(otherRoom)
        }

        API.print(
            'Tunneling ' +
                direction +
                ' from ' +
                plyRoom.name +
                ' to ' +
                otherRoom.name
        )
        API.handle('dig ' + direction + ' ' + otherRoom.id)
        API.handle(
            'dig ' +
                cardinalOpposite[direction.toLowerCase()] +
                ' ' +
                plyRoom.id +
                ' ' +
                otherRoom.id
        )
    }

    const dig = ([direction = '', id, from]) => {
        const playerRoom = from ? API.get(from) : API.room()
        if (direction === '') return 'Dig to where?'
        if (playerRoom.get('exit', direction)) return 'That exit already exists'

        if (id == null) {
            const newRoom = API.create('room')
            API.addRoom(newRoom)
            playerRoom.content.push(
                API.create({
                    type: 'exit',
                    name: direction,
                    target: newRoom.id,
                })
            )
            return (
                'You dig a new room towards ' +
                direction +
                ' with ID #' +
                newRoom.id
            )
        } else {
            if (API.get(id)) {
                playerRoom.content.push(
                    API.create({ type: 'exit', name: direction, target: id })
                )
                return 'Digging an exit to Room #' + id
            } else return 'No such room to link'
        }
    }

    const edit = ([name, prop, _val]) => {
        if (!name || !prop || !_val)
            return 'You entered an invalid amount of arguments (edit [THING|HERE|SELF] [PROPERTY] [VALUE])'
        let val = _val

        const player = API.player()
        const room = API.room()

        if (parseFloat(val).toString() !== 'NaN') val = parseFloat(val)

        let target = null

        switch (name) {
            case 'here':
                target = room
                break
            case 'self':
                target = player
                break
            default:
                target = room.get('any', name) || player.get('any', name)
        }
        if (!target) return 'You entered an invalid target'
        if (Array.isArray(target))
            return [
                'Ambigious target, did you mean any of these?',
                ...target.map((o) => o.name),
            ]

        target[prop] = val

        return target.look()
    }

    const runpad = () => {
        API.print('Running notepad as script..')
        API.handle(API.notepad())
    }

    const patch = (jsonStringSet) => {
        const fullString = jsonStringSet.join(' ')
        return API.patch(fullString)
    }

    const gex = ([filename]) => {
        API.exportPack(filename)
        return "Exported game"
    }

    return {
        edit,
        dig,
        tunnel,
        create,
        remove,
        runpad,
        patch,
        gex
    }
}

export default commandConstructor
