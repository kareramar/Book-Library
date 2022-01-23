const router = require('express').Router();
const bookModel = require('../model/book_model');

router.get('/getBookList', async (req, res)=> {
   const bookList = await bookModel.find();
   console.log(bookList);
   res.send(bookList);
});

router.get('/getBookList/:id', async (req, res)=> {
    const { id } = req.params;
    const book = await bookModel.findOne({title : id});
    if(!book) return res.send("Book Not Found");
    res.send(book);
});

router.post('/books', async  (req, res)=> {
    const title= req.body.title;
    const subtitle = req.body.subtitle;
    const isbn=req.body.isbn;
    const author = req.body.author;
    const description=req.body.description;
    const publisher=req.body.publisher;
    const bookExist = await bookModel.findOne({title : title});
  
    if (bookExist) return res.send('Book already exist');

    var data = await bookModel.create({title,isbn,author,subtitle,description,publisher});
    data.save();

    res.send("Book Added Successfully.....");
    
});


router.put('/books/:id', async(req, res)=> {
    const { id } = req.params;
    const {
        subtitle,
        isbn,
        description,
        publisher,
        author,
    } = req.body;

    const bookExist = await bookModel.findOne({title : id});
    if (!bookExist) return res.send('Book Do Not exist');

    const updateField = (val, prev) => !val ? prev : val;

    const updatedBook = {
        ...bookExist ,
        isbn: updateField(isbn, bookExist.isbn),
        description: updateField(description, bookExist.description),
        subtitle: updateField(subtitle, bookExist.subtitle),
        publisher: updateField(publisher, bookExist.publisher),
        author: updateField(author, bookExist.author)
    };
    await bookModel.updateOne({title: id},{$set :{isbn: updatedBook.isbn,description: updatedBook.description,subtitle: updatedBook.subtitle,publisher: updatedBook.publisher,author: updatedBook.author}})
    
    res.status(200).send("Book Updated Successfully.....");
});

router.delete('/books/:id', async  (req, res)=> {
    const { id } = req.params;

    const bookExist = await bookModel.findOne({title : id});
    if (!bookExist) return res.send('Book Do Not exist');

   await bookModel.deleteOne({ title: id }).then(function(){
        console.log("Data deleted"); // Success
        res.send("Book Record Deleted Successfully")
    }).catch(function(error){
        console.log(error); // Failure
    });
});

module.exports = router;