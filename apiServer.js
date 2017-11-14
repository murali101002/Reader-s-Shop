var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();




// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookShop');
var Books = require('./models/books');

// Create/Add books to DB using node POST method
app.post('/books', (req, res)=>{
  var book = req.body;
  console.log('req',req.body);
  Books.create(book, (err, books)=>{
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//GET list of books from the DB
app.get('/books', (req, res)=>{
  Books.find((err, books)=>{
    if(err){
      throw err;
    }
    res.json(books);
  })
})

app.put('/books/:_id', (req, res)=>{
  var book = req.body;
  var params = req.params._id;
  var update = {
    '$set':{
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price,
      upsert: true
    }
  };
  var options = {new:true};
  Books.findOneAndUpdate(params, update, options, (err, books)=>{
    if(err) throw err;
    res.json(books);
  })
})

app.delete('/books/:_id', (req, res)=>{
  var params = req.params._id;
  Books.remove({_id:params}, (err, books)=>{
    if(err) throw err;
    res.json(books);
  })
})
// END API


app.listen(3001, (err)=>{
  if(err){
    return console.log(err);
  }
  console.log('API Sever is listening on http://localhost:3001');
})

module.exports = app;
