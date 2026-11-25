const http = require('http');
const port = process.env.PORT || 10000;
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end('<h1>Render spare is up</h1><p>OK</p>');
}).listen(port, () => console.log('listening on ' + port));
