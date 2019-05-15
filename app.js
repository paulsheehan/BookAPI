var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var mongoUrl = require('./private/mongoUrl'); 
var db = mongoose.connect(mongoUrl, {useNewUrlParser: true});

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;


var bookRouter = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter.route('/Books')
    .post(function(req, res) {
        var book = new Book(req.body);
        book.save();
        res.status(201).send(book);
    })
    .get(function(req, res) {

        var query = {};
        if(req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function(err, books) {
            if(err) {
                res.status(500).send(err);
            }
            else {
                res.json(books);
            }
        });
    });


bookRouter.route('/Books/:bookId')
    .get(function(req, res) {
        Book.findById(req.params.bookId, function(err, book) {
            if(err) {
                res.status(500).send(err);
            }
            else {
                res.json(book);
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

