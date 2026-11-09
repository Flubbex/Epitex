export default class StorageService {
    disableSaving = false
    storedSave = null

    autoSaveCall = null 

    constructor(store) {
        window.dbg('StorageService', 'Constructing')
        this.autoSave = this.autoSave.bind(this, store)
    }
    autoSave(store,saveName) {
        window.dbg("StorageService", "Autosaving",store.save())
        if (!this.disableSaving && !window.nuked) this.save(saveName,store.save())
    }

    createAutoSaver(saveName,store){
        return () => this.autoSave(saveName,store)
    }

    addSaveListener(saveName,store) {
        window.dbg('StorageService',`Adding save listener for ${saveName}`)

        if (this.autoSaveCall)
            window.removeEventListener('visibilitychange', this.autoSaveCall)

        this.autoSaveCall = this.createAutoSaver(saveName,store).bind(this)

        window.addEventListener('visibilitychange', this.autoSaveCall)
    }

    removeSaveListener() {
        window.removeEventListener('visibilitychange', this.autoSave)
    }

    load(gamePackInfo) {
        window.dbg(
            'StorageService',
            `Attempting to load from saved state "${gamePackInfo.name}" `
        )

        this.storedSave = window.localStorage.getItem(gamePackInfo.name)

        if (!this.storedSave || this.storedSave === 'null') {
            window.dbg('StorageService', 'No saved state found')
            return null
        }
        let saveData = {}
        try {
            saveData = JSON.parse(this.storedSave)
        } catch (error) {
            console.warn(
                'StorageService: Savedata is malformed, starting fresh.'
            )
            console.warn(error)
            window.localStorage.removeItem(this.saveName)
            return null
        } finally {
            window.dbg('StorageService', 'Save loaded succesfully')
        }

        saveData.gamePackInfo = gamePackInfo

        this.storedSave = saveData

        return saveData
    }

    save(saveName,saveState) {
        //window.dbg("StorageService", "Saving")
        localStorage.setItem('notepad', saveState.ui.notepad)
        localStorage.setItem(saveName, JSON.stringify(saveState))
    }

    nuke() {
        localStorage.removeItem(this.storedSave.gamePackInfo.name)
    }
}
