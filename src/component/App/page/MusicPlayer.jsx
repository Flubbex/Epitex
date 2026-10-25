import { useEffect, useState } from "react"

const Player = ({src}) => (
    <iframe width="100%" height="100%" 
        src={src} 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen>
    </iframe>
)

const MusicPlayer = ({game}) =>{
    const [src,setSrc] = useState(game.store.ui.music)

    const applySrc = (v) => {
        setSrc(v)
    }
    useEffect(()=>{
        game.store.ui.on("updatedMusic",applySrc)
        return ()=>{
            game.store.ui.off("updatedMusic",applySrc)
        }
    },[game])

    return (
    <div className="container p-0 bg-dark" style={{height:"75vh"}}>
        <div className="row h-100">
            <div className="col h-100">
                <Player src={src}  />
            </div>
        </div>
    </div>)
}

export default MusicPlayer