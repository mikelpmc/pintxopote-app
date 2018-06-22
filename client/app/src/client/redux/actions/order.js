import logic from './../../../logic/';
import { reset } from 'redux-form';

import {
    GET_ORDERS_SUCCESS,
    ORDER_SUCCESS,
    ORDERS_ERROR,
    VALIDATE_ORDER_SUCCESS,
    VALIDATE_ORDER_ERROR,
    PINTXOPOTE_ORDERS_SUCCESS,
    TOGGLE_MODAL
} from './types';

// CREATE AN ORDER
export const createOrder = (pintxopote, quantity) => {
    return dispatch => {
        return logic
            .createOrder({ pintxopote, quantity })
            .then(() => {
                dispatch({
                    type: ORDER_SUCCESS
                });

                dispatch({
                    type: TOGGLE_MODAL,
                    payload: ''
                });

                dispatch(reset('orderForm'));
            })
            .catch(error => {
                dispatch({
                    type: ORDERS_ERROR,
                    payload: error
                });
            });
    };
};

// GET ORDERS BY USER ID
export const getOrdersByUserId = () => {
    return dispatch => {
        return logic
            .getOrdersByUserId()
            .then(orders => {
                dispatch({
                    type: GET_ORDERS_SUCCESS,
                    payload: orders
                });
            })
            .catch(error => {
                dispatch({
                    type: ORDERS_ERROR,
                    payload: error
                });
            });
    };
};

// VALIDATE ORDER
export const validateOrder = orderId => {
    return dispatch => {
        return logic
            .validateOrder({ orderId })
            .then(() => {
                dispatch({
                    type: VALIDATE_ORDER_SUCCESS,
                    payload: `¡Genial! Reserva con id ${orderId} validada con éxito`
                });
            })
            .catch(error => {
                dispatch({
                    type: VALIDATE_ORDER_ERROR,
                    payload: error
                });
            });
    };
};

// GET PINTXOPOTE ORDERS BY ID
export const getPintxopoteOrdersById = pintxopoteId => {
    return dispatch => {
        return logic
            .getPintxopoteOrdersById({ pintxopoteId })
            .then(orders => {
                dispatch({
                    type: PINTXOPOTE_ORDERS_SUCCESS,
                    payload: orders
                });
            })
            .catch(error => {
                dispatch({
                    type: ORDERS_ERROR,
                    payload: error
                });
            });
    };
};
