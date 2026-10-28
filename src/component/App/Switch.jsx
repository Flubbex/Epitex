import Main from './page/main'
import World from './page/World'
import Notepad from './page/Notepad'
import Settings from './page/Settings'
import MusicPlayer from './page/MusicPlayer'

const Switch = ({ route, game }) => {
    return (
        <div className="col">
            <div className={route === 'world' ? '' : 'd-none'}>
                <World game={game} />
            </div>
            <div className={route === 'notepad' ? '' : 'd-none'}>
                <Notepad game={game} />
            </div>
            <div className={route === 'settings' ? '' : 'd-none'}>
                <Settings test={123} />
            </div>
            <div className={route === 'main' ? '' : 'd-none'}>
                <Main game={game} />
            </div>
            <div className={route === 'music' ? '' : 'd-none'}>
                <MusicPlayer game={game} />
            </div>
        </div>
    )
}

export default Switch
