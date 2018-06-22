import axios from 'axios';
import logic from './../../../logic/';

import {
    UPDATE_PUBS_SUCCESS,
    UPDATE_PUBS_ERROR,
    GET_PUB_SUCCESS,
    GET_PUB_ERROR
} from './types';

const BASE_URL = 'https://secure-reef-96406.herokuapp.com/api';

// GET PUBS BY CITY
export const fetchPubsByCity = city => {
    return dispatch => {
        return logic.listPubsByCity({ city }).then(pubs => {
            dispatch({
                type: UPDATE_PUBS_SUCCESS,
                payload: pubs
            });
        });
    };
};

// GET PUB BY ID
export const getPubById = id => {
    return dispatch => {
        return logic
            .getPubById({ id })
            .then(pub => {
                dispatch({
                    type: GET_PUB_SUCCESS,
                    payload: pub
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_PUB_ERROR,
                    payload: error
                });
            });
    };
};
