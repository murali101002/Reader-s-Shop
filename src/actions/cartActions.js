import {
  ADD_BOOK_TO_CART, ADD_BOOK_TO_CART_ERR, DELETE_BOOK_FROM_CART, GET_ALL_BOOKS_FROM_CART_ERR,
  GET_ALL_BOOKS_FROM_CART, UPDATE_BOOK_IN_CART, UPDATE_BOOK_IN_CART_ERR, DELETE_BOOK_FROM_CART_ERR
} from '../constants';
import axios from 'axios';

export const addBookToCart = cart => {
  return dispatch => {
    axios.post('/api/cart', cart)
      .then(response => {
        dispatch({ type: ADD_BOOK_TO_CART, cart: response.data })
      })
      .catch(err => {
        dispatch({ type: ADD_BOOK_TO_CART_ERR, error: 'Unable to save the cart to the database' })
      })
  }
}

export const deleteBookFromCart = cart => {
  return dispatch=>{
    axios.post('/api/cart', cart)
        .then(response=>{
          console.log('response', response.data);
          dispatch({type:DELETE_BOOK_FROM_CART, cart:response.data});
        })
        .catch(error=>{
          dispatch({type:DELETE_BOOK_FROM_CART_ERR, error:'Error in removing book from cart'})
        })
  }
}

export const getAllBooksFromCart = () => {
  return dispatch => {
    axios.get('/api/cart')
      .then(response => {
        dispatch({ type: GET_ALL_BOOKS_FROM_CART, cart: response.data })
      })
      .catch(err => {
        dispatch({ type: GET_ALL_BOOKS_FROM_CART_ERR, error: 'Unable to get cart from database' })
      })
  }
}

export const updateBookInCart = (_id, val, cart) => {
  const bookToUpdate_id = cart.findIndex(book => book._id === _id);
  const updatedBook = {
    ...cart[bookToUpdate_id], qty: cart[bookToUpdate_id].qty + val
  };
  const updatedCart = [...cart.slice(0, bookToUpdate_id), updatedBook, ...cart.slice(bookToUpdate_id+1)];
  return dispatch => {
    axios.post('/api/cart', updatedCart)
      .then(response => {
        dispatch({ type: UPDATE_BOOK_IN_CART, cart: response.data });
      })
      .catch(err => {
        dispatch({ type: UPDATE_BOOK_IN_CART_ERR, error: 'Error in updating the cart' });
      })
  }
}