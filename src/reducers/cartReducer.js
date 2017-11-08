import { ADD_BOOK_TO_CART, DELETE_BOOK_FROM_CART, GET_ALL_BOOKS_FROM_CART, UPDATE_BOOK_IN_CART } from '../constants';

export const cartReducer = (state = { cart: [] }, action) => {
  const booksInCart = [...state.cart];
  switch (action.type) {
    case ADD_BOOK_TO_CART:
      return { 
        cart: action.book,
        totalAmount: totals(action.book).amount,
        totalQty: totals(action.book).quantity
       };
    case DELETE_BOOK_FROM_CART:
      return {
        cart: action.cart,
        totalAmount: totals(action.cart).amount,
        totalQty: totals(action.cart).quantity
      };
    case UPDATE_BOOK_IN_CART:
      return { 
        cart: action.cart,
        totalAmount: totals(action.cart).amount,
        totalQty: totals(action.cart).quantity
       };
    case GET_ALL_BOOKS_FROM_CART:
      return { ...state, cart: [...state.cart] };
    default:
      return state;
  }
}

function totals(cart){
  const amount = cart.map(book=>book.price*book.qty).reduce((sum, value)=>sum+value, 0);
  const quantity = cart.map(book=>book.qty).reduce((sum, value)=>sum+value, 0);
  return {
    amount: amount.toFixed(2),
    quantity
  }
}
