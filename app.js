var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var mongoUrl = require('./private/mongoUrl'); 
var db = mongoose.connect(mongoUrl, {useNewUrlParser: true});

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = require('./Routes/bookRoutes')(Book);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my API!');
});

app.listen(port, function() {
    console.log('Running on PORT: ' + port);
});

