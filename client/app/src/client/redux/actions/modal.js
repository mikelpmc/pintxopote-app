import { TOGGLE_MODAL } from './types';

export const toggleModal = id => {
    return dispatch => {
        dispatch({
            type: TOGGLE_MODAL,
            payload: id
        });
    };
};
