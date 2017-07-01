require('http').createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('running :)')
}).listen(80, () => console.log('listening on :80'))
