import {ADD_BOOK_TO_CART} from '../constants';

export const addBookToCart = book=>{
  const action = {
    type: ADD_BOOK_TO_CART,
    book
  }
  return action;
}