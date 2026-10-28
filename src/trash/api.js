import store from '../store'

import modalService from './modal'

class APIService {
    /**
     * Create an instance in the world
     */
    create(state) {
        return store.world.instance(state)
    }

    /**
     * Get anything from world's byID table
     */
    get(id) {
        return store.world.byId[id]
    }

    /**
     * Return the current room the player is
     */
    room() {
        return this.get(store.player.room)
    }

    /**
     * Place an item into a container
     */
    place(item, _target = null) {
        const target = this.get(_target) || this.room()
        target.add(item)
    }

    /**
     * remove an item from a container
     */
    remove(item, _target) {
        const target = this.get(_target) || this.room()
        target.remove(item)
    }

    /**
     * Show a modal
     * @param {any} props - The state of the modal\
     * Drop an example in here
     */
    showModal(props) {
        modalService.show(props)
        //this.emit("modalChanged",modalService)
    }

    /**
     * Hide the current modal
     */
    hideModal() {
        modalService.hide()
        //this.emit("modalChanged",null)
    }
}

export default new APIService()
