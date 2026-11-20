const typePrefix = {
    game:"GAME_",
    library:"LIB_",
    save:"SAVE_"
}
export default class StorageService {
    disableSaving = false
    autoSaveCall = null

    stored = {
        game:{},
        library:{},
        save:{},
        snapshot:{}
    }

    constructor(defaultContent) {
        window.dbg("StorageService", "Constructing")
        Object.keys(localStorage)
        .filter((key) => key.startsWith("GAME_") || key.startsWith("LIB_") || key.startsWith("SAVE_") || key.startsWith("SNAP_") )
        .map((slot) => this.load(slot,true))

        defaultContent.map((content)=> this.stored[content.info.type][content.id] = content)
    }

    list(type) {
        return Object.keys(this.stored[type]).map((k) => this.stored[type][k])
    }

    createSaveListener(type, store) {
        const slotName = typePrefix[type]+store.id
        window.dbg("StorageService", `Creating save listener for ${slotName}`)

        if (this.autoSaveCall)
            window.removeEventListener("visibilitychange", this.autoSaveCall)

        this.autoSaveCall = () => this.save(type, store.save())

        window.addEventListener("visibilitychange", this.autoSaveCall)
    }

    removeSaveListener() {
        if (this.autoSaveCall)
            window.removeEventListener("visibilitychange", this.autoSaveCall)
    }

    
    updateSlot(slot){
        window.dbg("StorageService",`Updating slot "${slot}" `)
        console.log(this.game[slot])
    }

    load(slot,save=false) {
        window.dbg(
            "StorageService",
            `Attempting to load data from "${slot}" `
        )

        const storedDataString = window.localStorage.getItem(slot)

        if (!storedDataString) {
            window.dbg("StorageService", "No saved state found")
            return null
        }

        let saveData = {}

        try {
            saveData = JSON.parse(storedDataString)
        } catch (error) {
            console.warn("StorageService: Savedata is malformed")
            console.warn(error)
            window.localStorage.removeItem(slot)
            return null
        } finally {
            window.dbg("StorageService", "Data loaded succesfully")
        }

        if (save){
            if (slot.startsWith("GAME_"))
                this.stored.game[saveData.id] = saveData
            else if (slot.startsWith("SAVE_"))
                this.stored.save[saveData.id] = saveData
            else if (slot.startsWith("SNAP_"))
                this.stored.snapshot[saveData.id] = saveData
        }

        return saveData
    }

    get(type,id) {
        return this.stored[type][id]
    }

    save(type,saveState) {
        const slotName = typePrefix[type]+saveState.id
        window.dbg("StorageModule", `Saving "${slotName}"`)
        localStorage.setItem(slotName, JSON.stringify(saveState))
        this.stored[type][saveState.id] = saveState
    }

    saveSnapshot(saveState,slot=1){
        const slotName = `SNAP#${slot}_${saveState.id}`
        window.dbg("StorageModule", `Snapshotting to "${slotName}"`)
        localStorage.setItem(slotName, JSON.stringify(saveState))
        this.stored.snapshot[slotName] = saveState
    }

    getSnapshot(id,slot=1){
        const slotName = `SNAP#${slot}_${id}`
        return this.stored.snapshot[slotName]
    }
    clear(type,id) {
        const slotName = typePrefix[type]+id
        window.dbg("StorageModule", `Clearing "${slotName}"`)

         delete this.stored[type][id]
   
        localStorage.removeItem(slotName)
    }

    nuke() {
        localStorage.clear()
    }
}
