const express = require('express');
const router = express.Router();

const Book = require('../models/bookscheema');

//retriving book data
router.get('/book', (req, res) => {
    Book.find((err, books)=> {
        res.json(books);
    })
});

//add book
router.post('/book', (req, res) => {

var newBook = new Book();
    newBook.title=req.body.title;
    newBook.author=req.body.author;
    newBook.url=req.body.url;

    newBook.save((err, books) => {
        if (err) {
            
            res.send('fail to add');
        } else {
            res.json(books);
        }    
   });
});

//delete book
router.delete('/book/:id', (req, res, next) => {
    Book.remove({ _id: req.params.id }, (err, books)=> {
        if (err) {
            res.json(err);
        } else {
            res.json(books);
        }
    });
});

//update book
router.put('/book/:id',(req, res) =>{
    Book.update({_id: req.params.id},
        {$set:
        {title:req.body.title,
        author:req.body.author,
        url:req.body.url}},
        {upsert:true},
         (err,books)=>{
        if (err) {
            res.json(err);
        } else {
            res.json(books);
        }
    })
})

module.exports = router;