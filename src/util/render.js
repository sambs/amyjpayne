import ReactDOMServer from 'react-dom/server'

const render = element => (
  '<!DOCTYPE html>\n' + ReactDOMServer.renderToStaticMarkup(element)
)

export default render
