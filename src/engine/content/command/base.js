const commandConstructor = (API) => {
     const clear = ( arg) => {
          API.clear()
          if ("silent" in arg === false)
               API.print("Output cleared")
     }
     const echo = (args) => {
          return args.join(" ")
     }

     const put = ( [item, sub, target]) => {

          if (!item || !sub || !target)
               return "What do you want to put in where?"
          
          const ply = API.player()
          const plyRoom = API.room()

          let itemSource = "player"
          let plyItem = ply.get("any", item)

          if (!plyItem) {
               itemSource = "room"
               plyItem = plyRoom.get("any",item)
          }

          let plyTarget = ply.get("any", target)

          if (!plyTarget) {
               plyTarget = plyRoom.get("any", target)
          }

          if (!plyItem)
               return "What do you want to put into something else?"
          if (plyItem.length)
               return [
                    "The item you want to put into something else is ambigious, did you mean any of these?"
               ].concat(plyItem.map((i) => i.name))

          if (!plyTarget)
               return "Where do you want to put the " + plyItem.name + "?"
          if (plyTarget.length)
               return [
                    "The item you want to put something in is ambigious, did you mean any of these?"
               ].concat(plyTarget.map((i) => i.name))

          if (!plyTarget.content)
               return "You can't put something into a " + plyTarget.name

          plyTarget.add(plyItem)

          if (itemSource === "player")
               ply.remove(plyItem)
          else
               plyRoom.remove(plyItem)

          return "Put the " + plyItem.name + " into the " + plyTarget.name
     }

     const give = ( [item, sub, target]) => {
          return put([item,sub,target])
     }

     const doCrawl = (room, area, map = {}) => {
        let exitSet = room.get("exit")
        if (!exitSet) return map
        if (!exitSet.length) exitSet = [exitSet]

        map[room.id] = exitSet.map((exit) => [exit.name, exit.target])

        exitSet.forEach((exit) => {
            const nextRoom = API.get(exit.target)
            if (nextRoom && nextRoom.area === area && !map[nextRoom.id])
                doCrawl(nextRoom, area, map)
        })

        return map
    }

    const map = () => {
        const curRoom = API.room()
        const map = doCrawl(curRoom, curRoom.area)

        const placed = {}
        const cells = {}
        let minX = Infinity, maxX = -Infinity
        let minY = Infinity, maxY = -Infinity

        const mark = (x, y, id) => {
            cells[`${x},${y}`] = id          // store the room id
            if (x < minX) minX = x
            if (x > maxX) maxX = x
            if (y < minY) minY = y
            if (y > maxY) maxY = y
        }

        const placeRoom = (id, x, y) => {
            if (placed[id]) return
            placed[id] = { x, y }
            mark(x, y, id)

            const exits = map[id] || []
            exits.forEach(([dir, targetId]) => {
                if (placed[targetId]) return

                let nx = x
                let ny = y
                switch (dir) {
                    case "North":     ny -= 1; break
                    case "South":     ny += 1; break
                    case "West":      nx -= 1; break
                    case "East":      nx += 1; break
                    case "Northeast": nx += 1; ny -= 1; break
                    case "Northwest": nx -= 1; ny -= 1; break
                    case "Southeast": nx += 1; ny += 1; break
                    case "Southwest": nx -= 1; ny += 1; break
                    default: return
                }
                placeRoom(targetId, nx, ny)
            })
        }

        placeRoom(curRoom.id, 0, 0)

        if (minX === Infinity) {
            API.print("No rooms to map.")
            return
        }

        const pad = 1
        minX -= pad
        maxX += pad
        minY -= pad
        maxY += pad

  
        const lines = [" "+new Array(Math.abs(minX)+maxX+1).fill("▲").join("")]
        for (let y = minY+1; y <= maxY; y++) {
            let row = ""
            for (let x = minX; x <= maxX; x++) {
                const id = cells[`${x},${y}`]
                if (!id) {
                    row += "▮"
                } else if (id === curRoom.id) {
                    // current room — different color
                    row += "<span class='text-success'>▯</span>"
                } else {
                    row += "<span>▯</span>"
                }
            }
            lines.push("◄"+row+"►")
        }

        lines.push([" "+new Array(Math.abs(minX)+maxX+1).fill("▼").join("")])

        API.print(...lines)
    }

    const quit = () => {
     API.quit()
    }

    const playmusic = ([videoId,startSeconds=0]) => {
     if (!videoId)
          return "Play what?"
     API.playMusic(videoId,startSeconds,()=>{ API.print("Playing!") })
     return "Loading music.."
    }
    
    const makescript = ([name,content]) => {
          if (!name)
               return "Create a script with what name?"
          if (!content)
               return "You failed to pass any content"

          API.print(`Creating script "${name}"`)
          return API.createScript(name,content)
    }

    const runscript = ([name]) => {
          if (!name)
               return "Run which script?"
          if (!API.scriptExists(name))
               return "No such script"
          return API.runScript(name)
    }
     return {
          clear,
          echo,
          put,
          give,
          map,
          quit,
          playmusic,
          makescript,
          runscript
     }
}

export default commandConstructor