import { useEffect, useState, useRef } from 'react'

const Player = ({ videoId, startSeconds = 0, callBack }) => {
    const containerRef = useRef(null)
    const playerRef = useRef(null)

    useEffect(() => {
        if (!window.YT || !window.YT.Player) return

        playerRef.current = new YT.Player(containerRef.current, {
            videoId,
            playerVars: {
                autoplay: 1,
                start: Math.floor(startSeconds), // seconds
                controls: 0,
                disablekb: 1,
                modestbranding: 1,
            },
            events: {
                onReady: (e) => {
                    // extra safety if autoplay is blocked
                    e.target.seekTo(startSeconds, true)
                    e.target.playVideo()
                    callBack()
                },
            },
        })

        return () => {
            playerRef.current?.destroy()
            playerRef.current = null
        }
    }, [videoId, startSeconds, callBack])

    return <div ref={containerRef} />
}
const MusicPlayer = ({ ui }) => {
    const [music, setMusic] = useState(ui.music)

    const applyMusic = (v) => {
        setMusic(v)
    }
    useEffect(() => {
        ui.on('updatedMusic', applyMusic)
        return () => {
            ui.off('updatedMusic', applyMusic)
        }
    }, [ui])

    return (
        <div className="container p-0 bg-dark" style={{ height: '75vh' }}>
            <div className="row h-100">
                <div className="col h-100">
                    {music.videoId && (
                        <Player
                            videoId={music.videoId}
                            startSeconds={music.startSeconds}
                            callBack={music.callBack}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer
