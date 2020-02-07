const chai = require ('chai');
const expect = chai.expect;
const request = require('superagent');
const status = require('http-status');

describe('GET and POST API Testing', function(){
	
	var server;
	
	before(function(done){
		
		console.log('index.js executing');
		console.log('test/test.js executing');

		var express = require('express');
		var app = express();
		var router = require('../routes/hello.js')
		var status = require('http-status');

		router.get('/', function (req, res) {
			res.send('Hello, World!');
		});

		router.post('/', function(req, res) {
			res.sendStatus(status.METHOD_NOT_ALLOWED);
		});

		app.use('/', router);

		var port = 3000;
		server = app.listen(port, function() {
		console.log('Listening on port ' + port);
		done();
		});
		
	});
	
	after(function() {
		
		server.close();
		
	});
	
	it('GET with status code 200 and text "Hello, World!"', function(done){
		request.get('http://localhost:3000/') 
			.end(
				function(err, res) {			
					expect(err).to.not.be.an('error'); // error should be not null
					expect(res.statusCode).to.equal(200); // status code should be 200 (OK)
					expect(res.text).to.equal('Hello, World!'); // text should be Hello, World!
					done();		
				});
	});
	
	it('POST with status code 405, is not allowed', function(done) {
		request.post('http://localhost:3000/')
			.end(
				function(err, res) {
					expect(err).to.be.an('error');
					expect(res.statusCode).to.equal(405);
					done();
				});
	});
	
});
