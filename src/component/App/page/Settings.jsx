import { useState,useEffect } from 'react'

const Settings = () => {
    const [theme,setTheme] = useState("default")
    let tag = document.getElementById('theme')
    const onThemeChanged = (newTheme) => {
        setTheme(newTheme.target.value)
        tag.href = '/Epitex/css/' + newTheme.target.value + '.css'
        document.head.removeChild(tag)
        document.head.appendChild(tag)
    }

    return (
            <div
                className="container bg-dark text-light"
                style={{ height: '75vh' }}
            >
                <div className="row">
                    <div className="col d-flex">
                        <span className="w-25">Theme:</span>
                        <span>
                            <select onChange={onThemeChanged}>
                                <option>Default</option>
                                <option>darkly</option>
                            </select>
                        </span>
                    </div>
                </div>
            </div>
        )
}
export default Settings
