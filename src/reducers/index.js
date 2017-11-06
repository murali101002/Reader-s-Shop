
import {combineReducers} from 'redux';
import {bookReducer} from './bookReducer';
import {cartReducer} from './cartReducer';

export default combineReducers({
  book: bookReducer,
  cart: cartReducer
});