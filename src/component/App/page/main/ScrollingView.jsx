import { useEffect, useRef, useState } from 'react'

const componentMap = {
  span: 'span',
  div: 'div',
  p: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  strong: 'strong',
  em: 'em',
  br: 'br',
  button: 'button',
  ul: 'ul',
  li: 'li',
  img: 'img'
  // add more as needed
}

export function MessageRenderer({ message, onCommand }) {
  if (!message) return null
  if (typeof message === 'string') return <>{message}</>

  const { type = 'span', className, content, command, style, ...rest } = message
  const Tag = componentMap[type] || 'span'

  const children = Array.isArray(content)
    ? content.map((c, i) => <MessageRenderer key={i} message={c} onCommand={onCommand} />)
    : content

  const props = {
    className,
    style,
    ...rest,
    onClick: command ? () => onCommand(command) : message.onClick,
  }

  // Self-closing tags
  if (type === 'br') return <Tag {...props} />

  return <Tag {...props}>{children}</Tag>
}

const ScrollingView = ({ ui }) => {
    const [output, setOutput] = useState(ui.output)
    const [locked, setLocked] = useState(true)

    const scrollEndRef = useRef(null)
    const scrollViewRef = useRef(null)

    useEffect(() => {
        const handleOutput = (v) => setOutput(v)
        ui.on('updatedOutput', handleOutput)

        return () => {
            ui.off('updatedOutput', handleOutput)
        }
    }, [ui])

    useEffect(() => {
        if (locked) scrollEndRef.current.scrollIntoView({ behavior: 'instant' })
    }, [output, locked])

    const isVisible = (ele, container) => {
        const { bottom, height, top } = ele.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        return top <= containerRect.top
            ? containerRect.top - top <= height
            : bottom - containerRect.bottom <= height
    }
    const onScroll = () => {
        const isLocked = isVisible(scrollEndRef.current, scrollViewRef.current)
        setLocked(isLocked)
    }

    return (
        <div
            className={'col ' + (locked ? 'locked' : 'unlocked')}
            id="scrollview"
            ref={scrollViewRef}
            onScroll={(ev) => onScroll(ev)}
        >
            {output.map((msg, i) => (
                <div key={i} className="message animate__animated animate__fadeIn">
                    <MessageRenderer message={msg} onCommand={(cmd) => ui.handle(cmd,true)} />
                </div>
            ))}

            <div
                id="scrollend"
                style={{ color: 'rgba(0,0,0,0)' }}
                ref={scrollEndRef}
            >
                You're not supposed to see this
            </div>
        </div>
    )
}
export default ScrollingView
