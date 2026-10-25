const delay = (time) =>  new Promise((resolve)=>{
        window.setTimeout(()=>{
            resolve()
        },time)
    })

export default delay