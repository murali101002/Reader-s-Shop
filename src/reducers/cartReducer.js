import {ADD_BOOK_TO_CART} from '../constants';

export const cartReducer = (state={cart:[]}, action)=>{
  switch(action.payload){
    case ADD_BOOK_TO_CART:
      return {cart:[...state.cart, ...action.book]};
    default:
      return state;
  }
}