var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var session = require('express-session');
var MongoStrore = require('connect-mongo')(session);

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
// Local DB
// mongoose.connect('mongodb://localhost:27017/bookShop');
// mLab DB
mongoose.connect('mongodb://murali:1234@ds111336.mlab.com:11336/book-shop');
var db = mongoose.connection;
/*===START SESSION===*/
app.use(session({
  secret: 'secretString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000*60*60*24*2},
  store: new MongoStrore({
    mongooseConnection:db,
    ttl: 2*24*60*60
  })
}));

// save cart session
app.post('/cart', (req, res)=>{
  req.session.cart = req.body;
  req.session.save(err=>{
    if(err) throw err;
    res.json(req.session.cart);
  })
});

// get saved cart session
app.get('/cart', (req, res)=>{
  console.log('cart', req.session.cart);
  if(typeof req.session.cart!=='undefined'){
    res.json(req.session.cart);
  }
})
/*===END SESSION===*/


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
});

//Images API call
app.get('/images/books', (req, res)=>{
  const fs = require('fs');
  const imgDir = __dirname + '/public/images/books/';
  let images = [];
  fs.readdir(imgDir, (err, files)=>{
    if(err) console.log('Error in reading the files');
    files.forEach(file=>{
      images.push({name:file});
    });
    res.json(images);
  })
});
// END API


app.listen(3001, (err)=>{
  if(err){
    return console.log(err);
  }
  console.log('API Sever is listening on http://localhost:3001');
})

module.exports = app;
