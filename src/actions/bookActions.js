import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK, GET_BOOKS, ADD_BOOK_ERR } from '../constants';
import axios from 'axios';

export const addBook = books => {
  return function (dispatch) {
    axios.post('/books', books)
      .then(response => {
        dispatch({ type: 'ADD_BOOK', payload: response.body })
      })
      .catch(error => {
        dispatch({ type: 'ADD_BOOK_ERR', payload: 'Error in adding new book' })
      })
  }
}

export const deleteBook = id => {
  const action = {
    type: DELETE_BOOK,
    id
  }
  return action;
}

export const updateBook = book => {
  const action = {
    type: UPDATE_BOOK,
    book
  }
  return action;
}

export const getBooks = () => {
  const action = {
    type: GET_BOOKS
  }
  return action;
}