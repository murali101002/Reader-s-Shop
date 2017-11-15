import { ADD_BOOK, DELETE_BOOK, RESET_ADD_BOOK_BUTTON, UPDATE_BOOK, GET_BOOKS, ADD_BOOK_ERR } from '../constants';


export const bookReducer = (state = { books: [] }, action) => {
  let booksInStore = state.books;
  switch (action.type) {
    case GET_BOOKS:
      return { ...state, books: [...action.books] };
    case ADD_BOOK:
      return {
        books: [...state.books, ...action.books],
        msg: 'Success! Click to continue',
        style: 'success'
      };
    case ADD_BOOK_ERR:
      return { ...state, msg: 'Try again!', style: 'error' }
    case DELETE_BOOK:
      if (booksInStore.length > 0) {
        let bookToDelete_Id = booksInStore.findIndex(book => book._id.toString() === action.id);
        return {
          books: [...booksInStore.slice(0, bookToDelete_Id), ...booksInStore.slice(bookToDelete_Id + 1)]
        };
      }
      return state;
    case UPDATE_BOOK:
      if (booksInStore.length > 0) {
        const bookToUpdate_Id = booksInStore.findIndex(book => book._id === action.book._id);
        return {
          books: [...booksInStore.slice(0, bookToUpdate_Id), action.book, ...booksInStore.slice(bookToUpdate_Id + 1)]
        };
      }
      return state;
    case RESET_ADD_BOOK_BUTTON:
      return {...state, msg:''}
    default:
      return state;
  }
}