import {ADD_BOOK_TO_CART, DELETE_BOOK_FROM_CART, GET_ALL_BOOKS_FROM_CART, UPDATE_BOOK_IN_CART} from '../constants';

export const addBookToCart = book=>{
  const action = {
    type: ADD_BOOK_TO_CART,
    book
  }
  return action;
}

export const deleteBookFromCart = cart=>{
  const action = {
    type: DELETE_BOOK_FROM_CART,
    cart
  }
  return action;
}

export const getAllBooksFromCart = ()=>{
  const action = {
    type: GET_ALL_BOOKS_FROM_CART
  }
  return action;
}

export const updateBookInCart = (_id, val, cart)=>{
  const bookToUpdate_id = cart.findIndex(book => book._id === _id);
  const updatedBook = {
    ...cart[bookToUpdate_id], qty:cart[bookToUpdate_id].qty+1
  }
  const action = {
    type: UPDATE_BOOK_IN_CART,
    cart: [...cart.slice(0, bookToUpdate_id), updatedBook, ...cart.slice(bookToUpdate_id+1)]
  }
  return action;
}