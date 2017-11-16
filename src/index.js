import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';
import Main from './components/main';
import thunk from 'redux-thunk';
import routes from './routes';

/* 
fetch the initial store object from redux in server to store object in client
client store object is created in requestHandler.js
INITIAL_STATE contains the initial server side redux store object, and we use it in the index.ejs to render initilal data
*/
const initialState = window.INITIAL_STATE

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, initialState, middleware);

const Routes = (
  <Provider store={store}>
    {routes}
  </Provider>
);

ReactDOM.render(
  Routes, document.getElementById('root'));
registerServiceWorker();
