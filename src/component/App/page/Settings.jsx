import { Component } from "react"

class Settings extends Component {

    constructor(){
        super()
        this.state = {
            theme:"default"
        }

        this.tag = null
    }
    componentDidMount(){
        this.tag = document.getElementById("theme")  
    }
    setTheme(theme){
        this.tag.href = "/css/"+theme+".css"
        document.head.removeChild(this.tag)
        document.head.appendChild(this.tag)
    }
    render(){
        const setTheme = ({target:{value:theme}}) => {
            this.setState({theme})
            this.setTheme(theme)
        }
        
        return (
        <div className="container bg-dark text-light" style={{height:"75vh"}}>
            <div className="row">
                <div className="col d-flex">
                    <span className="w-25">Theme:</span>
                    <span>
                        <select onChange={setTheme}>
                            <option>Default</option>
                            <option>darkly</option>
                        </select>
                    </span>
                </div>
            </div>
        </div>
        )
    }
}

export default Settings