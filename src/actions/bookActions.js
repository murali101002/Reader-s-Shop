import {ADD_BOOK, DELETE_BOOK, UPDATE_BOOK} from '../constants';

export const addBook = books=>{
  const action = {
    type: ADD_BOOK,
    books
  }
  return action;
}

export const deleteBook = id=>{
  const action = {
    type: DELETE_BOOK,
    id
  }
  return action;
}

export const updateBook = book=>{
  const action = {
    type: UPDATE_BOOK,
    book
  }
  return action;
}