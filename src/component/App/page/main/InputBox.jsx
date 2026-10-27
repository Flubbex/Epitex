import { Component, useState } from "react";

const InputBox = ({game}) => {
  
  const [input,setInput] = useState(localStorage.getItem("dbg_lastInput")||"")
  const [history,setHistory] = useState([])
  const [historyKey,setHistoryKey] = useState(0)
  
  const handleKeyDown = (ev) => {
      if (ev.key === "ArrowUp" && historyKey > 0) {
        setHistoryKey(historyKey-1)
        setInput(history[historyKey-1])
        ev.preventDefault()
        ev.stopPropagation()
        return
      }

      if (ev.key !== "Enter" || ev.shiftKey || !input)
        return

      if (!input.trim()) {
        setInput("")
        return
      }

      localStorage.setItem("dbg_lastInput", input)
      game.handle(input)
      setHistory(history.concat(input))
      setHistoryKey(history.length+1)
      setInput("")

      ev.preventDefault()
      ev.stopPropagation()
    }

   return (
      <>
      <textarea type="text"
        className="form-control bg-secondary mono"
        id="inputarea"
        placeholder="Enter commands here"
        style={{fontSize:"14px"}}
        value={input}
        onChange={(v) => setInput(v.target.value)}
        onKeyDown={(v) => handleKeyDown(v)}
      ></textarea>
      </>
   )
}
export default InputBox