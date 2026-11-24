const spacer = (name, len = 20) => " ".repeat(len - name.length)

const colors = ["turquoise","cyan","green","yellow","pink","salmon","lightblue","violet","purple","snow","orange"]

const associated = {}

let id = 0 

window.dbg = (source, ...v) => {
    if (!associated[source]) {
        associated[source] = colors[id++] || "white"
    } 

    const color = associated[source] || "white"
    console.log("%c"+source+spacer(source)+v,"color:"+color )
}

window.nuke = () => (localStorage["savedGame"] = null)
