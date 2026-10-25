const Room = ({room}) => (
  <div className="card border bg-dark text-light p-2 m-2" 
  style={{width:"inherit"}}>
    <div><span>#{room.id}</span> - <span>{room.name}</span></div>
    <div className="border" style={{overflowY:"scroll"}}>{
    room.description}
    </div>
    <div>
      <span>Exits:</span>
      {room.content.filter((item)=>item.type==="exit")
      .map((exit)=><div key={exit.id}>{exit.name} {"->"} #{exit.target}</div>)}
    </div>
    <div className="btn-group" style={{position:"absolute",right:10,bottom:10}}>
      <button className="btn btn-light">Edit</button>
    </div>
  </div>
)

const WorldPage = ({game:{store:{world:{room:roomSet}}}}) => (
  <div className="container" style={{height:"75vh"}}>
    <div className="row h-100">
      <div className="col border h-100" style={{overflowY:"scroll"}}>
        <div className="d-flex flex-wrap h-100">
        {
          roomSet.map((room)=>
            <Room room={room} key={room.id}/>
          )
        }
        </div>
      </div>
    </div>
  </div>
)

export default WorldPage