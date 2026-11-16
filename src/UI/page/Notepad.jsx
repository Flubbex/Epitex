import { useEffect, useState } from 'react'

const Notepad = ({ ui }) => {
    const [text, setText] = useState(ui.notepad)

    const notepadChanged = (value) => {
        setText(value)
        localStorage.setItem('notepad', value)
    }

    useEffect(()=>{
        ui.on("updated_notepad",notepadChanged)
        return ()=> ui.off("updated_notepad",notepadChanged)
    },[ui])
    
    return (
        <div className="container" style={{ height: '75vh' }}>
            <div className="row h-100">
                <div className="col h-100">
                    <textarea
                        className="h-100 w-100 p-3 pt-2"
                        id="notepad"
                        onChange={(e) => ui.set("notepad",e.target.value)}
                        value={text}
                    ></textarea>
                </div>
            </div>
        </div>
    )
}

export default Notepad
