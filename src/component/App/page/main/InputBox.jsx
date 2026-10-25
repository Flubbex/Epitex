import { Component, useState } from "react";

export class InputBoxOld extends Component {
  constructor(props) {
    super();
    this.state = {
      input: props.game.input || localStorage.getItem("dbg_lastInput"),
      history: [],
      historyId: 0
    };

    this.handleKeyDown = (ev) => {
      if (ev.key === "ArrowUp" && this.state.historyId > 0) {
        this.state.historyId--;
        this.setState({ input: this.state.history[this.state.historyId] });
        ev.preventDefault();
        ev.stopPropagation();
        return;
      }
      if (ev.key !== "Enter" || !this.state.input)
        return;
      if (ev.shiftKey)
        return;
      if (!this.state.input.trim()) {
        this.setState({ input: "" });
        return;
      }

      localStorage.setItem("dbg_lastInput", this.state.input);
      props.game.handle(this.state.input);
      this.state.historyId = this.state.history.push(this.state.input);
      this.setState({ input: "" });

      ev.preventDefault();
      ev.stopPropagation();
    };
  }

  componentDidUpdate() {
    this.props.game.input = this.state.input;
  }

  componentDidMount() {
    document.getElementById("inputarea").focus();
  }

  render() {
    return (
      <textarea type="text"
        className="form-control bg-secondary mono"
        id="inputarea"
        placeholder="Enter commands here"
        style={{fontSize:"14px"}}
        value={this.state.input || ""}
        onChange={(v) => this.setState({ input: v.target.value })}
        onKeyDown={(v) => this.handleKeyDown(v)}
      ></textarea>);
  }
}

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