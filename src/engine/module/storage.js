export default class StorageService {
    disableSaving = false
    autoSaveCall = null 

    keySet = []
    stored = {}

    constructor() {
        window.dbg('StorageService', 'Constructing')
        console.log(localStorage)
        const storedKeySet = localStorage.getItem("keySet")
        this.keySet = JSON.parse(storedKeySet) || []

   
        this.keySet.map((key)=>{
            this.stored[key] = this.load(key)
        })
    }
 
    list(){
        return this.keySet.map((k) => this.stored[k] )
    }
    createSaveListener(saveName,store) {
        window.dbg('StorageService',`Creating save listener for ${saveName}`)

        if (this.autoSaveCall)
            window.removeEventListener('visibilitychange', this.autoSaveCall)

        this.autoSaveCall = () => this.save(saveName,store.save())

        window.addEventListener('visibilitychange', this.autoSaveCall)
    }

    removeSaveListener() {
        if (this.autoSaveCall)
            window.removeEventListener('visibilitychange', this.autoSaveCall)
    }

    load(slot) {
        window.dbg(
            'StorageService',
            `Attempting to load saved state from "${slot}" `
        )

        const storedDataString = window.localStorage.getItem(slot)

        if (!storedDataString) {
            window.dbg('StorageService', 'No saved state found')
            return null
        }

        let saveData = {}
        
        try {
            saveData = JSON.parse(storedDataString)
        } catch (error) {
            console.warn(
                'StorageService: Savedata is malformed'
            )
            console.warn(error)
            window.localStorage.removeItem(slot)
            return null
        } finally {
            window.dbg('StorageService', 'Data loaded succesfully')
        }
        
        return saveData
    }

    get(slot){
        return this.stored[slot]
    }

    save(slot,saveState) {
        window.dbg("StorageModule",`Saving "${slot}"`)
        localStorage.setItem(slot, JSON.stringify(saveState))
        if (this.keySet.indexOf(slot) === -1) {
            this.keySet.push(slot)
            localStorage.setItem("keySet", JSON.stringify(this.keySet) )
        }
        this.stored[slot] = saveState
    }

    clear(slot){
        window.dbg("StorageModule",`Clearing "${slot}"`)

        delete this.stored[slot]
        localStorage.removeItem(slot)
        
        if (this.keySet.indexOf(slot) !== -1){
            this.keySet = this.keySet.filter((e) => e === slot)
            localStorage.setItem("keySet", JSON.stringify(this.keySet) )
        }
    }

    nuke() {
        localStorage.removeItem(this.storedSave.gamePackInfo.name)
    }
}
