import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Main from './components/main';
import App from './App';
import BookForm from './components/bookForm';
import Cart from './components/cart';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={App} />
        <Route path='/admin' component={BookForm} />
        <Route path='/cart' component={Cart} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(
  Routes, document.getElementById('root'));
registerServiceWorker();
