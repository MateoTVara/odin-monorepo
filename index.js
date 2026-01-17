import http from 'node:http'
import * as fsp from 'node:fs/promises'

const routes = {
  '/': 'index',
  '/about': 'about',
  '/contact-me': 'contact-me',
}

const getHtml = async (htmlFile) => {
  try {
    const file = await fsp.readFile(`./${htmlFile}.html`, {encoding:'utf-8'})
    return file
  } catch (error) {
    console.log(error)
    return null
  }
}

const sendResponse = (res, status, body, type='text/html') => {
  res.writeHead(status, {'Content-Type': type})
  res.end(body)
}

const server = http.createServer( async (req, res) => {
  if (req.url.endsWith('.css')) {
    const css = await fsp.readFile('./styles.css', {encoding:'utf-8'})
    sendResponse(res, 200, css, 'text/css')
    return
  }

  const fileKey = routes[req.url]
  const htmlFile = fileKey ? fileKey : '404'
  const status = fileKey ? 200 : 404

  if (!req.url.endsWith('.css') && !req.url.endsWith('.ico')) {
    console.log(`${req.method}: ${req.url} - Status: ${status}`)
  }

  const body = await getHtml(htmlFile)

  if (body) {
    sendResponse(res, status, body, 'text/html')
  } else {
    const msg = 'Server Error'
    sendResponse(res, 500, msg, 'text/plain')
  }
})

server.listen(8000, () => {
  const addr = server.address()
  console.log(`Server listening on http://localhost:${addr.port}`)
})