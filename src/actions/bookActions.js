import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK, GET_BOOKS, ADD_BOOK_ERR } from '../constants';
import axios from 'axios';

export const addBook = books => {
  return function (dispatch) {
    axios.post('/books', books)
      .then(response => {
        dispatch({ type: ADD_BOOK, books: response.data })
      })
      .catch(error => {
        dispatch({ type: ADD_BOOK_ERR, payload: 'Error in adding new book' })
      })
  }
}

export const deleteBook = id => {
  return dispatch=>{
    axios.delete('/books/'+id)
        .then(response=>{
          dispatch({type: DELETE_BOOK, id: id});
        })
        .catch(error=>{
          dispatch({type: DELETE_BOOK_ERR, error: 'There is an error in deleting the book'});
        })
  }
}

export const updateBook = book => {
  return dispatch=>{
    axios.put('/books', book)
        .then(response=>{
          dispatch({type: UPDATE_BOOK, id: id})
        })
  }
}

export const getBooks = () => {
  return dispatch=>{
    axios.get('/books')
          .then(response=>{
            dispatch({type: GET_BOOKS, books: response.data}) 
          })
          .catch(error=>{
            dispatch({type:GET_BOOKS_ERR, error:'There is an error in fetching the books'});
          })
  }
}