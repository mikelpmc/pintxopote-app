import logic from './../../../logic/';

import {
    UPDATE_PINTXOPOTES_SUCESS,
    UPDATE_PINTXOPOTES_ERROR,
    GET_PINTXOPOTE_SUCESS,
    GET_PINTXOPOTE_ERROR
} from './types';

// FETCH PINTXOPOTES BY CITY
export const fetchPintxosByCity = city => {
    return dispatch => {
        return logic
            .fetchPintxosByCity({ city })
            .then(pintxopotes => {
                dispatch({
                    type: UPDATE_PINTXOPOTES_SUCESS,
                    payload: pintxopotes
                });
            })
            .catch(error => {
                dispatch({
                    type: UPDATE_PINTXOPOTES_ERROR,
                    payload: error
                });
            });
    };
};

// FETCH PINTXOPOTE BY ID
export const getPintxopoteById = id => {
    return dispatch => {
        return logic
            .getPintxopoteById({ id })
            .then(pintxopote => {
                dispatch({
                    type: GET_PINTXOPOTE_SUCESS,
                    payload: pintxopote
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_PINTXOPOTE_ERROR,
                    payload: error
                });
            });
    };
};
