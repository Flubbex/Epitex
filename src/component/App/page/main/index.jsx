//import { useEffect, useState } from "react"
import ScrollingView from "./ScrollingView"
import InputBox from "./InputBox"

/*
const ControlPanel = ({ game }) => {
  const [plyRoom, setPlayerRoom] = useState(game.store.world.get(game.store.player.room))
  const exit = plyRoom.content.filter((e) => e.type === "exit").map((e) => e.name)
  const cd = (dir) => exit.indexOf(dir) === -1
  
  useEffect(()=>{
    game.store.player.off("moved", setPlayerRoom)
    game.store.player.on("moved", setPlayerRoom)
  },[game.store.player])

  return (
    <div className="d-flex w-100 flex-wrap">
      <button className="btn btn-primary p-2" disabled={cd("Northwest")}
        style={{ width: "33%" }}>NW</button>
      <button className="btn btn-primary p-2" disabled={cd("North")}
        style={{ width: "33%" }}>N</button>
      <button className="btn btn-primary p-2" disabled={cd("Northeast")}
        style={{ width: "33%" }}>NE</button>

      <button className="btn btn-primary p-2" disabled={cd("West")}
        style={{ width: "33%" }}>W</button>
      <button className="btn btn-primary p-2" disabled={cd("Null")}
        style={{ width: "33%" }}>O</button>
      <button className="btn btn-primary p-2" disabled={cd("East")}
        style={{ width: "33%" }}>E</button>

      <button className="btn btn-primary p-2" disabled={cd("Southwest")}
        style={{ width: "33%" }}>SW</button>
      <button className="btn btn-primary p-2" disabled={cd("South")}
        style={{ width: "33%" }}>S</button>
      <button className="btn btn-primary p-2" disabled={cd("Southeast")}
        style={{ width: "33%" }}>SE</button>
    </div>
  )
}
*/

const MainPage = ({ game }) => (
  <div className="container">
    <div className="row">
      <ScrollingView game={game} />
    </div>
    <div className="row" >
      <div className="col p-0">
        <InputBox game={game} />
      </div>
    </div>
  </div>
)

export default MainPage