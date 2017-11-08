import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';
import Menu from './components/menu';
import Footer from './components/footer';

const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

ReactDOM.render(
<Provider store={store}>
  <div id="container">
    <Menu />
    <App />
    <Footer />
  </div>
</Provider>, document.getElementById('root'));
registerServiceWorker();
