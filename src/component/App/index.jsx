import {useState } from "react"

import Sidebar from "./Sidebar"
import Switch from  "./Switch"

const App = ({game}) => {
  const [route,setRoute] = useState("main")

  return (
    <>
    <div className="backdrop" id="backdrop_1"></div>
    <div className="backdrop" id="backdrop_2"></div>
    <div className="backdrop" id="backdrop_3"></div>

    <div className="container-fluid" id="container">
      <div className="row">
      <Sidebar route={route} setRoute={setRoute} />
      </div>
      <div className="row" id="frame">
          <Switch route={route} setRoute={setRoute} game={game} />
      </div>
    </div>
    </>
  )
}
export default App
