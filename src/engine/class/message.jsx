class Message {
    text = "[Empty]"
    style = {}
    class = "message"
    
    constructor(styleInfo,text){
        this.text = text
        if (styleInfo.color)
            this.class += " "+styleInfo.color 
        if (styleInfo.style)
            this.style = styleInfo.style
    }

    toReact(){
        if (this.style)
            return <div className={this.class} style={this.style}>{this.text}</div>
            else
            return <div className={this.class} style={this.style}>{this.text}</div>
    }
}

export default Message