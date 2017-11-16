import axios from 'axios';

function requestHandler(req, res){
  axios.get('http://localhost:3001/books')
      .then(response=>{
        var data = JSON.stringify(response.data);
        res.render('index', {data});
      })
      .catch(error=>{
        console.error('Error in retreiving the books data', error);
      })
}

module.exports = requestHandler;