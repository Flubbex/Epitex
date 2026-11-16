import Room from '.'

class Menu extends Room {
    type = 'menu'
    constructor(state = {}) {
        super(state)
    }

    look() {
        super.look()
        const exitList = {type:"div",content:[]}

        this.content.map((obj) => {
            switch (obj.type) {
                case 'exit':
                    exitList.content.push({type:"button",className:"btn",content:obj.name,command:`go ${obj.name}`})
                    break
                default:
                    break
            }
            return null
        })

        return {...this.description,content:this.description.content.concat(exitList)}
    }
}

export default Menu
