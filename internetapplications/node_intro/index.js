console.log('index.js executing');
console.log('test/test.js executing');

var express = require('express');
var app = express();
var router = require('./routes/hello.js')
var status = require('http-status');

router.get('/', function (req, res) {
	res.send('Hello, World!');
});

router.post('/', function(req, res) {
	res.sendStatus(status.METHOD_NOT_ALLOWED);
});

app.use('/', router);

var port = 3000;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});
