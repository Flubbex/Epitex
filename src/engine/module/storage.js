export default class StorageService {
    saveName = 'savedGame'
    disableSaving = true
    storedSave = null

    constructor(store) {
        window.dbg('StorageService', 'Constructing')
        this.autoSave = this.autoSave.bind(this, store)
    }
    autoSave(store) {
        //window.dbg("StorageService", "Autosaving")
        if (!this.disableSaving && !window.nuked) this.save(store.save())
    }

    addSaveListener() {
        window.dbg('StorageService', 'Adding save listener')
        window.removeEventListener('visibilitychange', this.autoSave)
        window.addEventListener('visibilitychange', this.autoSave)
    }

    removeSaveListener() {
        window.removeEventListener('visibilitychange', this.autoSave)
    }

    load(gamePackInfo) {
        window.dbg(
            'StorageService',
            `Attempting to load from saved state "${this.saveName}" `
        )

        this.storedSave = window.localStorage.getItem(this.saveName)

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

        return saveData
    }

    save(saveState) {
        //window.dbg("StorageService", "Saving")
        localStorage.setItem('notepad', saveState.ui.notepad)
        localStorage.setItem(this.saveName, JSON.stringify(saveState))
    }

    nuke() {
        localStorage.removeItem(this.saveName)
    }
}
