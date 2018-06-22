import {
    VALIDATE_ORDER_SUCCESS,
    VALIDATE_ORDER_ERROR
} from './../actions/types';

const initialState = {
    validate: false,
    msg: ''
};

export default (state = initialState, action) => {
    // console.log('ACTION', action);

    switch (action.type) {
        case VALIDATE_ORDER_SUCCESS:
            return {
                validate: true,
                msg: action.payload
            };
        case VALIDATE_ORDER_ERROR:
            return {
                validate: false,
                msg: action.payload
            };
        default:
            return state;
    }
};
