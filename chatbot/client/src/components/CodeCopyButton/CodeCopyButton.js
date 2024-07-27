import React from 'react'
import './CodeCopyButton.css'
export default function CodeCopyBtn ({ children }) {
  const [copyOk, setCopyOk] = React.useState(false)
  const icon = copyOk ? 'fa-check-square' : 'fa-copy'
  const handleClick = (e) => {
    // console.log(children)
    navigator.clipboard.writeText(children.props.children)

    setCopyOk(true)
    setTimeout(() => {
      setCopyOk(false)
    }, 500)
  }
  return (
    <div className="code-copy-btn">
      <i className={`fas ${icon}`} onClick={handleClick} />
    </div>
  )
}
