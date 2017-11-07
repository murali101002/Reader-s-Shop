import { ADD_BOOK_TO_CART, DELETE_BOOK_FROM_CART, GET_ALL_BOOKS_FROM_CART, UPDATE_BOOK_IN_CART } from '../constants';

export const cartReducer = (state = { cart: [] }, action) => {
  const booksInCart = [...state.cart];
  switch (action.type) {
    case ADD_BOOK_TO_CART:
      return { cart: [...state.cart, ...action.book] };
    case DELETE_BOOK_FROM_CART:
      const bookToDelete_id = booksInCart.findIndex(book => book._id === action._id);
      return {
        cart: [...booksInCart.slice(0, bookToDelete_id), ...booksInCart.slice(bookToDelete_id + 1)]
      };
    case UPDATE_BOOK_IN_CART:
      const bookToUpdate_id = booksInCart.findIndex(book=>book._id === action.book._id);
      return {cart:[...booksInCart.slice(0,bookToUpdate_id), action.book, ...booksInCart.slice(bookToUpdate_id+1)]};

    default:
      return state;
  }
}

