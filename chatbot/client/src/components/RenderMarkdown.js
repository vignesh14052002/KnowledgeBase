import ReactMarkdown from 'react-markdown'
import React from 'react'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import CodeCopyBtn from './CodeCopyButton/CodeCopyButton'
import { oneDark, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function RenderMarkdown ({ markdown }) {
  const Pre = ({ children }) => (
    <pre className="blog-pre">
      <CodeCopyBtn>{children}</CodeCopyBtn>
      {children}
    </pre>
  )
  return (
    <ReactMarkdown
    className="message-body"
      // linkTarget="_blank"
      remarkPlugins={[gfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        pre: Pre,
        code: ({ node, inline, className, children, ...props }) => {
          if (inline) {
            // Render inline code blocks without syntax highlighting
            return <code>{children}</code>
          }
          return (
            // Render fenced code blocks with syntax highlighting
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={className?.replace('language-', '')}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          )
        }
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}
