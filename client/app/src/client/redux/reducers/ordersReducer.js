import {
    UPDATE_ORDERS_SUCCESS,
    GET_ORDERS_SUCCESS,
    ORDER_SUCCESS,
    ORDERS_ERROR,
    PINTXOPOTE_ORDERS_SUCCESS
} from './../actions/types';

const initialState = {
    orders: [],
    pintxopoteOrders: [],
    error: '',
    success: ''
};

export default (state = initialState, action) => {
    // console.log('ACTION', action);

    switch (action.type) {
        case ORDER_SUCCESS:
            return {
                orders: state.orders,
                pintxopoteOrders: state.pintxopoteOrders,
                error: '',
                success: '¡Genial! Reserva realizada con éxito'
            };
        case GET_ORDERS_SUCCESS:
            return {
                orders: action.payload,
                pintxopoteOrders: state.pintxopoteOrders,
                error: '',
                success: ''
            };
        case PINTXOPOTE_ORDERS_SUCCESS:
            return {
                ...state,
                pintxopoteOrders: action.payload
            };
        case ORDERS_ERROR:
            return {
                orders: [],
                pintxopoteOrders: state.pintxopoteOrders,
                error: action.payload,
                success: ''
            };
        default:
            return {
                orders: state.orders,
                pintxopoteOrders: state.pintxopoteOrders,
                error: '',
                success: ''
            };
    }
};
