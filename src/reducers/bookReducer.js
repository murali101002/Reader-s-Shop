import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK } from '../constants';


export const bookReducer = (state = { books: [] }, action) => {
  let booksInStore = state.books;
  switch (action.type) {
    case ADD_BOOK:
      return {
        books: [...state.books, ...action.books]
      };
    case DELETE_BOOK:
      if (booksInStore.length > 0) {
        let bookToDelete_Id = booksInStore.findIndex(book => book.id === action.id);
          return {
            books: [...booksInStore.slice(0, bookToDelete_Id), ...booksInStore.splice(bookToDelete_Id + 1)]
          };
      }
      return state;
    case UPDATE_BOOK:
      if (booksInStore.length > 0) {
        let bookToUpdate_Id = booksInStore.findIndex(book => book.id === action.book.id);
          return {
            books: [...booksInStore.slice(0, bookToUpdate_Id), action.book, ...booksInStore.splice(bookToUpdate_Id + 1)]
          };
      }
      return state;
    default:
      return state;
  }
}