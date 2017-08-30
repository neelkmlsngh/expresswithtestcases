let assert = require('chai').assert;
let expect = require('chai').expect;
let should = require('chai').should();
let sinon = require('sinon')
let scheema = require('../models/bookscheema')
let stubSave=sinon.stub(scheema.prototype,'save')
let stubUpdate=sinon.stub(scheema,'update')
let stubDelete=sinon.stub(scheema,'remove')
let app = require('../app.js')
let supertest = require('supertest')
let express = require('express')
//Stubbing find method of model
let modelStub = sinon.stub(scheema, 'find');
let address = supertest('http://localhost:3000')
describe('test my get on server on port 3000', () => {

    modelStub.yields(null, [{ 'title': 'halfgirlfriend', 'author': 'chetanbhagat', 'url': 'www.halfgirlfriend.com' }])

    it("should attempt to find items", (done) => {
        address
            .get('/api/book')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body[0].author).to.be.equal("chetanbhagat");
                done();
            })
    })
})
/*describe('find the data', ()=> {
    it('respond with json', (done)=> {

        modelStub.yields(null, [{ title: "halfgirlfriend", author: "chetanbhagat", url: "www.halfgirlfriend.com" }])
        supertest(app)
            .get('/api/book')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body[0].title).to.be.equal("halfgirlfriend");
                done();
            })
    });
});*/

describe('test my post method', () => {
   before(() => {
       stubSave.yields(null, {
           "title": "gone girl",
           "author": "Gillian Flynn",
           "url": "www.gonergirl.com"
       });
   })
   it('It should respond with post', (done) => {
       
       address
           .post('/api/book')
           .end((err, res) => {
               if (err) return done(err);
               else {
                   expect(res.body.title).to.be.equal("gone girl");
                   done();
               }
           });
   });
});

describe('test my put method', function() {                    
                 
                  before(()=>{
                    stubUpdate.withArgs({ '_id':"123123"},{$set:
                                                            {'title':"Beloved",
                                                            'author': "Toni Morrison",
                                                             'url': "www.beloved.com"}})
                                                       .yields(null, {
                                                                "ok":1,
                                                                "modified":1,
                                                                "n":1
                                                            });
                                     });
                   
            it('It should respond with put', function(done) {
                  address                
                    .put('/api/book/123123')
                    .send({'title':"Beloved",
                           'author': "Toni Morrison",
                           'url': "www.beloved.com"})
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function(err, res) {
                        if (err)return done(err);
                        else{
                        expect(res.body.ok).to.be.equal(1);  
                  done();
              }
          })
        })
       })            


describe('test my put method', ()=> {                    
                 
                  before(function(){
                    stubDelete.withArgs({ '_id':"123123"})
                                   .yields(null, {
                                            "ok":1,
                                            "modified":1,
                                            "n":1
                                        })
                 });
                   
            it('It should respond with put', (done)=> {
                  address                
                    .delete('/api/book/123123')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function(err, res) {
                        if (err)return done(err);
                        else{
                        expect(res.body.ok).to.be.equal(1);  
                  done();  
              }
            });
        });
    });
