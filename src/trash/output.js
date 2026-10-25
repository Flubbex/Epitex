class OutputService {

    render(raw){
        let out = null
        if (typeof raw === "undefined")
            return out
        else if (Array.isArray(raw))
            out = raw
        else if (typeof raw === "string")
            out = raw.split("\n")
        else if (typeof raw === "object")
            out = JSON.stringify(raw,null,2).split("\n")

        return out
    }
}

export default new OutputService()