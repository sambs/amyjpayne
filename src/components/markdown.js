import React from 'react'
import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt()
const convert = x => markdown.render(x)

const Markdown = ({ elementType = 'div', id, className = '', content = '' }) =>
  React.createElement(
    elementType,
    { id, className, dangerouslySetInnerHTML: { __html: convert(content) } }
  )

export default Markdown
