import Main from './page/main'
import Editor from './page/Editor'
import Notepad from './page/Notepad'
import Settings from './page/Settings'
import MusicPlayer from './page/MusicPlayer'

const Switch = ({ route, game }) => {

    
    return (
        <div className="row">

            <div className={"col "+ (route === 'editor' ? '' : 'd-none')}>
                <Editor game={game} />
            </div>
            <div className={"col "+ (route === 'notepad' ? '' : 'd-none')}>
                <Notepad game={game} />
            </div>
            <div className={"col "+ (route === 'settings' ? '' : 'd-none')}>
                <Settings game={game} />
            </div>
            <div className={"col "+ (route === 'main' ? '' : 'd-none')}>
                <Main game={game} />
            </div>
            <div className={"col "+ (route === 'music' ? '' : 'd-none')}>
                <MusicPlayer game={game} />
            </div>
        </div>
    )
}

export default Switch
