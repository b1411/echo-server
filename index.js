const http = require('http')
const os = require('os')

const PORT = process.env.PORT || 3000
const VERSION = '7.0.0'

http.createServer((req, res) => {
  const body = []
  req.on('data', chunk => body.push(chunk))
  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      version: VERSION,
      hostname: os.hostname(),
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: Buffer.concat(body).toString() || null
    }, null, 2))
  })
}).listen(PORT, () => console.log(`echo server v${VERSION} listening on ${PORT}`))
