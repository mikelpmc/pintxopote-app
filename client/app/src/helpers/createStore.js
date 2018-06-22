import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import reducers from './../client/redux/reducers/';

export default () => {
    const composeEnhancers =
        typeof window != 'undefined'
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
            : compose;

    const store = createStore(
        reducers,
        {},
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
