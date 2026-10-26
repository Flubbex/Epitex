import Room from "." 

class Menu extends Room {

    type = "menu"
    constructor(state={}){
        super(state)
        this.event["objRemoved"] = ["clear"]
    }

    look() {
        const exitList = []

        this.content.map((obj) => {
            switch (obj.type) {
                case "exit":
                    exitList.push("<a href='#' onClick='game.handle(\"go " + 
                        obj.name + "\",true)'>" + obj.name + "</a>")
                    break
                default:
                    break
            }
            return null
        })

        const output = [this.description].concat(exitList)

        return output.join("\n")
    }
}

export default Menu