var host = 'localhost';
var port = 8006;
var http = require('http');
var httpServer = http.createServer(handleHTTP).listen(port, host);
var ASQ = require('asynquence');
var node_static = require('node-static');
var static_files = new node_static.Server(__dirname);

function handleHTTP(request, response) {
  request.addListener('end', function () {
    static_files.serve(request, response);
  }).resume();
}
