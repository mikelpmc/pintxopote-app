// ENTRY POINT CLIENT SIDE

import 'babel-polyfill'; // To use async await and more
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import axios from 'axios';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import reducers from './redux/reducers/';

// El initial state viene inyectado por el componente
const initialState = window.INITIAL_STATE;

// Se crea el store redux del cliente con los datos que trae el servidor
const store = createStore(reducers, initialState, applyMiddleware(thunk));

import App from './App';

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
