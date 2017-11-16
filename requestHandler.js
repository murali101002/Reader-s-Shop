import axios from 'axios';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import reducers from './src/reducers';
import routes from './src/routes';

function requestHandler(req, res) {
  axios.get('http://localhost:3001/books')
    .then(response => {
      // create a client redux store object to fetch the initial data from server redux store
      const store = createStore(reducers, { "book": { "books": response.data } });
      // preventing script injection when stringifying the server response
      const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
      const Routes = {
        routes,
        location: req.url
      }
      match(Routes, (error, redirect, props) => {
        if (error) {
          res.status(500).send("Error in fetching the response");
        } else if (redirect) {
          res.status(302).send(redirect.pathname + redirect.search);
        } else if (props) {
          const reactComponent = renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>
          );
          res.status(200).render('index', { reactComponent, initialState });
        } else {
          res.status(404).send('Not Found');
        }
      })


    })
    .catch(error => {
      console.error('Error in retreiving the books data', error);
    })
}

module.exports = requestHandler;