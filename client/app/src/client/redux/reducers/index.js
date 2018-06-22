import { combineReducers } from 'redux';

import authReducer from './authReducer';
import pintxosReducer from './pintxosReducer';
import pubsReducer from './pubsReducer';
import ordersReducer from './ordersReducer';
import validateReducer from './validateReducer';

import modalReducer from './modalReducer';

import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    pintxos: pintxosReducer,
    pubs: pubsReducer,
    orders: ordersReducer,
    validate: validateReducer,
    modal: modalReducer,
    form: formReducer
});
