import { useEffect, useState } from "react"

const EditorPage = ({
    game: {
        store: {byId},
    },
}) => {

    const [list,setList] = useState({})
    const [cat,setCat] = useState([])
    
    useEffect( () => {

            const newList = {}
            const newCat = []
            Object.keys(byId).map((id)=>{
                const item = byId[id]
                if (newCat.indexOf(item.type) === -1)
                    newCat.push(item.type) 

                newList[item.type] ? newList[item.type].push(item) : newList[item.type] = [item]
                
            })

            setList(newList)
            setCat(newCat)
    },[byId])
    return (
    <div className="container-fluid" style={{ height: '75vh' }}>
        <div className="row h-100" style={{overflowY:"scroll"}}>
            <div className="col col-4 h-100">
                <div className="list-group list-group-flush">
                  
                </div>
            </div>
            <div className="col">
                Content
            </div>
        </div>
    </div>
)
}
export default EditorPage
