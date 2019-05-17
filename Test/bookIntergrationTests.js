var should = require('should'),
    request = require('supertest'),
    app = ('./app.js'),
    mongoose = require('mongoose'),
    Book = require('../models/bookModel'),
    agent = request.agent(app);

describe('Book CRUD Test', function() {
    it('Should allow a book to be posted and return a read and _id', function(done) {
        var bookPost = {
            title: 'new Book', 
            author: 'Paul', 
            genre: 'Fiction'
        }

        agent.post('api/Books/')
            .send(bookPost)
            .expect(200)
            .end(function(err, results) {
                if(err) {
                    console.debug("ERRORRRR:::", err);
                }
                results.body.read.should.equal(false);
                results.body.should.have.property(_id);
                done();
            });
    });

    afterEach(function(done) {
        Book.remove().exec();
        done();
    });
});