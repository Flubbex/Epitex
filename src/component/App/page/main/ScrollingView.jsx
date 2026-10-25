import { useEffect, useRef, useState } from "react"

const ScrollingView = ({game}) => {
  const [output,setOutput] = useState(game.store.ui.output)
  const [locked,setLocked] = useState(true)
  
  const scrollEndRef = useRef(null)
  const scrollViewRef = useRef(null)

  useEffect(()=>{
    const handleOutput = (v) => setOutput(v)
    game.store.ui.on("updatedOutput", handleOutput)

    return ()=>{
      game.store.ui.off("updatedOutput",handleOutput)
    }
    
  },[game])

  useEffect(()=>{
    if (locked)
      scrollEndRef.current.scrollIntoView({behavior:"instant"})
  },[output,locked])

  const isVisible = (ele, container) => {
    const { bottom, height, top } = ele.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    return top <= containerRect.top ? containerRect.top - top <= height : bottom - containerRect.bottom <= height

  }
  const onScroll = () => {
    const isLocked = isVisible(scrollEndRef.current, scrollViewRef.current)
    setLocked(isLocked)
  }

  return <div className={"col "+(locked?"locked":"unlocked")} id="scrollview" ref={scrollViewRef}
      onScroll={(ev) => onScroll(ev)}>
        {output.map((v, i) => <div key={i}
          className="animate__animated animate__fadeIn message"
          dangerouslySetInnerHTML={{ __html: v }}>
        </div>)}
        <div id="scrollend" style={{color:"rgba(0,0,0,0)"}} ref={scrollEndRef}>You're not supposed to see this</div>
    </div>
}
export default ScrollingView