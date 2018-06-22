import logic from './../../../logic';

import {
    FETCH_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGOUT_USER,
    UPDATE_PROFILE_ERROR
} from './types';

/**
 * REGISTER USER
 */
export const registerUser = (name, surname, email, password, history) => {
    return dispatch => {
        return logic
            .registerUser({ name, surname, email, password })
            .then(() => {
                dispatch({
                    type: REGISTER_USER_SUCCESS
                });

                history.push('/login');
            })
            .catch(error => {
                dispatch({
                    type: REGISTER_USER_ERROR,
                    payload: error
                });
            });
    };
};

/**
 *
 * Authenticates a user
 *
 * @param {string} email
 * @param {string} password
 */
export const authUser = (email, password, history, ref, pintxoId) => {
    return dispatch => {
        return logic
            .login({ email, password })
            .then(user => {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    payload: user
                });

                if (ref !== '' && pintxoId !== '') {
                    history.push(`/pintxos/${pintxoId}`);
                } else {
                    history.push('/');
                }
            })
            .catch(error => {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: error
                });
            });
    };
};

/**
 * FETCH USER
 */
export const fetchUser = () => dispatch => {
    return logic
        .getUser()
        .then(user => {
            dispatch({
                type: FETCH_USER_SUCCESS,
                payload: user
            });
        })
        .catch(error => {
            logic.logout();

            dispatch({
                type: UPDATE_USER_ERROR,
                payload: error
            });
        });
};

/**
 * LOGOUT USER
 *
 * @param {Object} history
 */
export const logout = history => {
    return dispatch => {
        return logic.logout().then(() => {
            dispatch({ type: LOGOUT_USER });

            history.push('/');
        });
    };
};

/**
 * UPDATE USER
 */
export const updateUser = (
    name,
    surname,
    email,
    street,
    city,
    postalCode,
    country,
    creditCard,
    history,
    ref,
    pintxoId
) => {
    return dispatch => {
        return logic
            .updateUser({
                name,
                surname,
                email,
                newEmail: email,
                address: { street, city, postalCode, country },
                creditCard
            })
            .then(user => {
                dispatch({ type: UPDATE_USER_SUCCESS, payload: user });

                if (ref !== '' && pintxoId !== '') {
                    history.push(`/pintxos/${pintxoId}`);
                }
            })
            .catch(error => {
                dispatch({ type: UPDATE_PROFILE_ERROR, payload: error });
            });
    };
};
