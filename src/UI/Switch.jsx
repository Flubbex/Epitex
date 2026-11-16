import Main from './page/main'
import Editor from './page/Editor'
import Notepad from './page/Notepad'
import Settings from './page/Settings'
import MusicPlayer from './page/MusicPlayer'

const Switch = ({ route, ui }) => {

    
    return (
        <div className="row">
            <div className={"col "+ (route === 'editor' ? '' : 'd-none')}>
                <Editor ui={ui} />
            </div>
            <div className={"col "+ (route === 'notepad' ? '' : 'd-none')}>
                <Notepad ui={ui} />
            </div>
            <div className={"col "+ (route === 'settings' ? '' : 'd-none')}>
                <Settings ui={ui} />
            </div>
            <div className={"col "+ (route === 'main' ? '' : 'd-none')}>
                <Main ui={ui} />
            </div>
            <div className={"col "+ (route === 'music' ? '' : 'd-none')}>
                <MusicPlayer ui={ui} />
            </div>
        </div>
    )
}

export default Switch
