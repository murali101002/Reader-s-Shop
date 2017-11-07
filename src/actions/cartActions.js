import {ADD_BOOK_TO_CART, DELETE_BOOK_FROM_CART, GET_ALL_BOOKS_FROM_CART, UPDATE_BOOK_IN_CART} from '../constants';

export const addBookToCart = book=>{
  const action = {
    type: ADD_BOOK_TO_CART,
    book
  }
  return action;
}

export const deleteBookFromCart = _id=>{
  const action = {
    type: DELETE_BOOK_FROM_CART,
    _id
  }
  return action;
}

export const getAllBooksFromCart = ()=>{
  const action = {
    type: GET_ALL_BOOKS_FROM_CART
  }
  return action;
}

export const updateBookInCart = book=>{
  const action = {
    type: UPDATE_BOOK_IN_CART,
    book
  }
  return action;
}