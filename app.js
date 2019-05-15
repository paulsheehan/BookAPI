var express = require('express'),
    mongoose = require('mongoose');

var mongoUrl = require('./private/mongoUrl'); 
var db = mongoose.connect(mongoUrl, {useNewUrlParser: true});

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;


var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function(req, res) {
        Book.find(function(err, books) {
            if(err) {
                res.status(500).send(err);
            }
            else {
                res.json(books);
            }
        });
    });

app.use('/api', bookRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my API!');
});

app.listen(port, function() {
    console.log('Running on PORT: ' + port);
});

