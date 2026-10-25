import { useState } from "react"

const Notepad = ({game}) =>{
    const [text,setText] = useState(game.store.ui.notepad)

    const changeText = (value) => {
        setText(value)
        game.store.ui.setNotepad(value)
    }
        return (
            <div className="container" style={{ height: "75vh" }}>
                <div className="row h-100">
                    <div className="col h-100">
                        <textarea className="h-100 w-100 p-3 pt-2" id="notepad"
                            onChange={(e) => changeText(e.target.value)}
                            value={text}>
                        </textarea>
                    </div>
                </div>
            </div>
        )
}

export default Notepad