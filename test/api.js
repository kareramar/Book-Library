let url=require('../config/db')
let mongoose = require("mongoose");
let Book = require('../model/book_model');
 url='test'
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

describe('Books', () => {
    beforeEach((done) => {
        Book.remove({}, (err) => {
           done();
        });
    });

    
  describe('/GET book', () => {
      it('it should GET all the books', (done) => {
            chai.request(server)
            .get('/getBookList')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });


  describe('/POST book', () => {
      it('it should not POST a book without title field', (done) => {
          let book = {
              title: "The Lord of the Rings",
              subtitle: "A Modern Introduction to Programming",
              isbn: "1",
              author: "J.R.R. Tolkien",
              description: "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
              publisher: "No Starch Press"
          }
            chai.request(server)
            .post('/books')
            .send(book)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should POST a book ', (done) => {
          let book = {
            title: "The Lord of the Rings",
            subtitle: "A Modern Introduction to Programming",
            isbn: "1",
            author: "J.R.R. Tolkien",
            description: "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            publisher: "No Starch Press"
          }
            chai.request(server)
            .post('/books')
            .send(book)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Book successfully added!');
                  res.body.book.should.have.property('title');
                  res.body.book.should.have.property('subtitle');
                  res.body.book.should.have.property('isbn');
                  res.body.book.should.have.property('author');
                  res.body.book.should.have.property('description');
                  res.body.book.should.have.property('publisher');
              done();
            });
      });
  });
  describe('/GET/:id book', () => {
      it('it should GET a book by the given id', (done) => {
          let book = new Book({ 
            title: "The Lord of the Rings",
            subtitle: "A Modern Introduction to Programming",
            isbn: "1",
            author: "J.R.R. Tolkien",
            description: "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            publisher: "No Starch Press"
             }
             );
          book.save((err, book) => {
              chai.request(server)
            .get('/getBookList/' + book.id)
            .send(book)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.book.should.have.property('title');
                  res.body.book.should.have.property('subtitle');
                  res.body.book.should.have.property('isbn');
                  res.body.book.should.have.property('author');
                  res.body.book.should.have.property('description');
                  res.body.book.should.have.property('publisher');
                  res.body.should.have.property('title').eql(book.id);
              done();
            });
          });

      });
  });
  describe('/PUT/:id book', () => {
      it('it should UPDATE a book given the id', (done) => {
          let book = new Book(
              {
                title: "The Lord of the Rings",
                subtitle: "A Modern Introduction to Programming",
                isbn: "1",
                author: "J.R.R. Tolkien",
                description: "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
                publisher: "No Starch Press"
                }
                )
          book.save((err, book) => {
                chai.request(server)
                .put('/books/' + book.id)
                .send({
                    title: "The Lord of the Rings",
                    subtitle: "A Modern Introduction to Programming",
                    isbn: "1",
                    author: "J.R.R. Tolkien",
                    description: "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
                    publisher: "No Starch Press"
                    })
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Book updated!');
                      res.body.should.have.property('title').eql(book.id);
                  done();
                });
          });
      });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id book', () => {
      it('it should DELETE a book given the id', (done) => {
          let book = new Book({
            title: "The Lord of the Rings",
            subtitle: "A Modern Introduction to Programming",
            isbn: "1",
            author: "J.R.R. Tolkien",
            description: "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            publisher: "No Starch Press"
            
            })
          book.save((err, book) => {
                chai.request(server)
                .delete('/books/' + book.id)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Book successfully deleted!');
                      res.body.result.should.have.property('ok').eql(1);
                      res.body.result.should.have.property('n').eql(1);
                  done();
                });
          });
      });
  });
});