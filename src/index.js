import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';
import {addBook} from './actions/bookActions';

const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

const books = [
  {
    id: 1,
    title: 'Book title1',
    description: 'this is a book description1',
    price: 23.99
  },
  {
    id: 2,
    title: 'Book title2',
    description: 'this is a book description2',
    price: 23.99
  }
]
store.dispatch(addBook(books));



ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
