// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongojs = require('mongojs');


// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener
app.set('port', process.env.PORT || 3000);


// socketio
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

// this communicates with the client side scripts to pass along the corresoponding message
io.on('connection', function(socket) {

	socket.on('message', function(msg) {

		io.emit('message', msg);

	}); // end socket.on()

	// the below console.log() was a good way to make sure I had this set up properly. Keeping it for future reference
	// console.log('a user connected');

}); // end io.on()


// morgan

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));


// -------------------------------------------------

// Database
var databaseUrl = 'mongodb://heroku_1pgm1ldm:tr2sm9fp0lr5prg2lbgl8ic6cr@ds139242.mlab.com:39242/heroku_1pgm1ldm'; //nytreact
// var databaseUrl = 'mongodb://localhost/nytimes';
var collections = ["articles"];

// use mongojs to hook the database to the db variable 
var db = mongojs(databaseUrl, collections);

db.on('error', function (err) {
  console.log('MongoDB Error: ', err);
});


// -------------------------------------------------

// Routes

// Main Route. This route will redirect to our rendered React application
app.get('/', function(req, res){

  res.sendFile('./public/index.html');
  
}); // end app.get()

// get data from the db. The api route will be accessed by helpers.js
app.get('/api/', function(req, res) {

	// grab all the articles in the database
	db.articles.find({}).sort({article_pub_date: -1}, function(err, docs) {

		if (err) throw err;

		console.log('getting the articles');

		res.send(docs);

	}); // end db.articles.find()

}); // end app.get()

// post data to the db. the api route will be accessed by helpers.js
app.post('/api/', function(req, res) {

	// save the article object which has the article title, url and publish date to the variable
	var article = req.body;

	// insert the article into the db
	db.articles.insert(article, function(err, docs) {

		if (err) throw err;

		console.log('saved to db');

		res.send(docs);

	}); // end db.articles.insert()

}); // end app.post()

// delete data from the db. Wanted to use app.delete but couldn't. Not sure why.
app.post('/api/delete/', function(req, res) {

	// save the article object which has the article id to the variable
	var article = req.body;

	console.log(article);

	// had to use .remove() instead of .deleteOne() but not sure why.
	db.articles.remove({"_id": (mongojs.ObjectId(article.article_id))}, function(err, docs) {
		
		if (err) throw err;

		console.log('article deleted');

		res.send(docs);

	}); // end db.articles.remove()

}); // end app.post()


// -------------------------------------------------


// Listeners

// this is the version before integrating socket.io
// app.listen(PORT, function() {
//   console.log("App listening on PORT: " + PORT);
// });

// this is the listener setup for integrating socket.io
http.listen(app.get('port'), function() {
	console.log('App listening on PORT: ' + PORT);
});