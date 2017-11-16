import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Main from './components/main';
import App from './App';
import BookForm from './components/bookForm';
import Cart from './components/cart';

const routes = (
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={App} />
        <Route path='/admin' component={BookForm} />
        <Route path='/cart' component={Cart} />
      </Route>
    </Router>
);

export default routes;
