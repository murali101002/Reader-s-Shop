"use strict"
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('public'));

app.get('*', (req, res)=>{
  res.sendfile(path.resolve(__dirname, 'public', 'index.html'));
})

app.listen(3000, ()=>{
  console.log('app is listening on 3000');
})