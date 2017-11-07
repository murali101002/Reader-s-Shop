import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK, GET_BOOKS } from '../constants';


export const bookReducer = (state = {
  books: [
    {
      _id: 1,
      title: 'Book title1',
      description: 'this is a book description1',
      price: 23.99
    },
    {
      _id: 2,
      title: 'Book title2',
      description: 'this is a book description2',
      price: 23.99
    },
    {
      _id: 3,
      title: 'Book title3',
      description: 'this is a book description3',
      price: 23.99
    }
  ]
}, action) => {
  let booksInStore = state.books;
  switch (action.type) {
    case GET_BOOKS:
      return {...state, books:[...state.books]};
    case ADD_BOOK:
      return {
        books: [...state.books, ...action.books]
      };
    case DELETE_BOOK:
      if (booksInStore.length > 0) {
        let bookToDelete_Id = booksInStore.findIndex(book => book._id === action._id);
        return {
          books: [...booksInStore.slice(0, bookToDelete_Id), ...booksInStore.splice(bookToDelete_Id + 1)]
        };
      }
      return state;
    case UPDATE_BOOK:
      if (booksInStore.length > 0) {
        const bookToUpdate_Id = booksInStore.findIndex(book => book._id === action.book._id);
        return {
          books: [...booksInStore.slice(0, bookToUpdate_Id), action.book, ...booksInStore.splice(bookToUpdate_Id + 1)]
        };
      }
      return state;
    default:
      return state;
  }
}