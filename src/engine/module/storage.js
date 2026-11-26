
export default class StorageService {
    disableSaving = false
    autoSaveCall = null

    ignoreSlot = ["dbg_lastInput","notepad"]
    stored = {
        byId:{}
    }

    constructor(defaultContent) {
        window.dbg("StorageService", "Constructing")
        Object.keys(localStorage)
        .filter((slot) => this.ignoreSlot.indexOf(slot) === -1 )
        .map((slot) => this.load(slot,true))

        defaultContent.map((content)=> this.import(content,true) )
    }

    list(type) {
        return Object.keys(this.stored[type]).map((k) => this.stored[type][k])
    }

    createSaveListener(store) {
        window.dbg("StorageService", `Creating save listener for ${store.id}`)

        if (this.autoSaveCall)
            window.removeEventListener("visibilitychange", this.autoSaveCall)

        this.autoSaveCall = () => this.save(store.save())

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

    import(saveData,skipSave=false){
        window.dbg("Storage",`Importing ${saveData.type} "${saveData.id}"`)
        const type = saveData.type 

        if (!this.stored[saveData.type])
            this.stored[saveData.type] = {[saveData.id]:saveData}
        else
            this.stored[saveData.type][saveData.id] = saveData

        this.stored.byId[saveData.id] = saveData

        if (!skipSave)
            this.save(saveData,true)
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
            console.log(slot)
            console.warn(error)
            //window.localStorage.removeItem(slot)
            return null
        } finally {
            window.dbg("StorageService", "Data loaded succesfully")
        }

        if (save) this.import(saveData,true)

        return saveData
    }

    get(id) {
        return this.stored.byId[id]
    }

    save(saveData,skipImport = false) {
        if (this.disableSaving)
            return 
        window.dbg("StorageModule", `Saving "${saveData.id}"`)
        localStorage.setItem(saveData.id, JSON.stringify(saveData))
        
        if (!skipImport)
            this.import(saveData,true)

        return saveData.id
    }

    clear(id) {
        window.dbg("StorageModule", `Clearing "${id}"`)

        const type = this.stored.byId[id].type 
        delete this.stored[type][id]
        delete this.stored.byId[id]
        localStorage.removeItem(id)
    }

    nuke() {
        localStorage.clear()
    }
}
