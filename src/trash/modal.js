class ModalService {

    visible = false
    title = "Empty Modal"
    body = "Yo mama"
    button = [
        {
            label: "Okay?",
            action: (game) => {
                game.modal = null
                game.emit("modalChanged",game.modal)
            }
        }
    ]

    show(props)
    {   
        for(const v in props)
            this[v] = props[v]
        
        this.visible = true 
    }

    hide(){
        this.visible = false 
    }

    toggle(){
        this.visible != this.visible
    }
}

export default new ModalService()