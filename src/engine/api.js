/**
 * Main access point for all user-input commands.
 * Injection function — returns the API surface bound to the given engine.
 */
const apiConstructor = (engine) => {
    const util = engine.util

    /**
     * Start a quest
     */
    const startQuest = async (name, room, ent) => {
        console.log('SQ', name)
        const quest = engine.content.get('quest', name)
        if (quest) quest(room, ent)
        else console.warn(`Attempted to start missing quest ${name}`)
    }

    /**
     * Handle a command
     */
    const handle = (input, silent = false) => {
        return engine.handle(input, silent)
    }

    /**
     * Print some text
     */
    const print = (...message) => {
        engine.store.ui.print(message)
    }

    /**
     * Clear the buffer
     */
    const clear = () => {
        engine.store.ui.clear()
    }

    /**
     * Create an object
     */
    const create = (state) => {
        return engine.store.create(state)
    }

    /**
     * Return the player
     */
    const player = () => {
        return engine.store.player
    }

    /**
     * Get any object in the world by its id
     */
    const get = (id) => {
        return engine.store.get(id)
    }

    /**
     * Create a room
     */
    const addRoom = (room) => {
        return engine.store.create(room)
    }

    /**
     * Find rooms by filter
     */
    const filterRoom = (filter) => {
        return engine.store.world.room.filter(filter)
    }

    /**
     * Map a room
     */
    const mapRoom = (mapper) => {
        return engine.store.world.room.map(mapper)
    }

    /**
     * Find a room
     */
    const findRoom = (filter) => {
        return engine.store.world.room.find(filter)
    }

    /**
     * Override a room
     */
    const overrideRoom = (newRoom) => {
        engine.store.world.room = newRoom
    }

    /**
     * Get the current room the player is in
     */
    const room = () => {
        return get(engine.store.player.room)
    }

    /**
     * Reset the engine
     */
    const reset = () => {
        return engine.reset()
    }

    /**
     * Put something in a container
     */
    const place = (item, _target = null) => {
        const target = get(_target) || room()
        target.add(item)
    }

    /**
     * Remove something from a container
     */
    const remove = (item, _target) => {
        const target = get(_target) || room()
        target.remove(item)
    }

    /**
     * Return the current text in the notepad
     */
    const notepad = () => {
        return engine.store.ui.notepad
    }

    /**
     * Set the input prompt
     */
    const inputPrompt = (prompt) => {
        engine.inputPrompt = prompt
    }

    /**
     * Get or set a questflag, pass no argument to get all of them
     */
    const questFlag = (name, value) => {
        if (value === undefined)
            return name
                ? engine.store.player.quest[name] || null
                : engine.store.player.quest
        else engine.store.player.quest[name] = value
    }

    /**
     * Fight an enemy
     */
    const fight = (being) => {
        return engine.combat.fight(being)
    }

    /**
     * Return the current battle
     */
    const getBattle = () => {
        return engine.store.battle
    }

    /**
     * Set the current battle
     */
    const setBattle = (battle) => {
        engine.store.battle = battle
    }

    /**
     * Patch in a bunch of rooms
     */
    const patch = (jsonString) => {
        let data = null
        console.log(jsonString)
        try {
            data = JSON.parse(jsonString)
        } catch (e) {
            console.warn(e)
            return 'Malformed JSON string'
        }

        const room = engine.store.patch(data)

        return `Patched in ${room.length} rooms, don't forget to dig an exit to #${room[0].id} somewhere`
    }

    /**
     * Run an action
     */
    const runAction = (name, ...args) => {
        const action = engine.content.get('action', name)
        if (!action)
            return console.warn('Tried running an unimplemented action:', name)

        return action(...args)
    }

    /**
     * Return the key if the player has a key that targets the id
     */
    const playerGetKey = (id) => {
        const allKey = player().get('key')

        if (allKey === null) return false

        if (!Array.isArray(allKey)) {
            if (allKey.target !== id) return false
            else return allKey
        }
        const correctKey = allKey.find((e) => e && e.target === id)

        if (!correctKey) return false

        return correctKey
    }

    /**
     * Generate a raw save state
     */
    const generateSave = () => {
        return engine.store.save()
    }

    /**
     * Start a file download
     */
    const createDownload = (data, type, filename) => {
        const a = document.createElement('a')
        const file = new Blob([data], { type: type })

        if (window.navigator.msSaveOrOpenBlob)
            // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename)
        else {
            // Others
            var url = URL.createObjectURL(file)
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            setTimeout(() => {
                document.body.removeChild(a)
                window.URL.revokeObjectURL(url)
            }, 0)
        }
    }

    /**
     * Get an event, either all or by name if passed
     */
    const getEvent = (name) => {
        return engine.content.get('event', name)
    }

    /**
     * Return available content packs
     */
    const getContentPackSet = () => {
        return engine.content.contentPackSet
    }

    /**
     * Load a game
     */
    const loadGamePack = async (name) => {
        window.dbg('--------------', 'Loading Pack')
        engine.print(`Loading game ${name}..`)
        await engine.util.delay(0)
        engine.store.ui.clear()
        engine.start(name)
    }

    /**
     * Drop back to the main menu (Unload any pack)
     */
    const quit = async () => {
        window.dbg('--------------', 'Quitting')
        engine.store.ui.clear()
        await engine.util.delay(0)
        engine.storage.removeSaveListener()
        engine.start()
    }

    /**
     * Play a song
     */
    const playMusic = (videoId, startSeconds = 0, callBack = null) => {
        engine.store.ui.setMusic({ videoId, startSeconds, callBack })
    }

    /**
     * Create a script
     */
    const createScript = (name, content) => engine.script.create(name, content)

    const scriptExists = (name) => engine.script.exists(name)

    const runScript = (name) => engine.script.run(name)

    return {
        util,
        startQuest,
        handle,
        print,
        clear,
        create,
        player,
        get,
        addRoom,
        filterRoom,
        mapRoom,
        findRoom,
        overrideRoom,
        room,
        reset,
        place,
        remove,
        notepad,
        inputPrompt,
        questFlag,
        fight,
        getBattle,
        setBattle,
        patch,
        runAction,
        playerGetKey,
        createDownload,
        generateSave,
        getEvent,
        getContentPackSet,
        loadGamePack,
        quit,
        playMusic,
        createScript,
        runScript,
        scriptExists,
    }
}

export default apiConstructor
