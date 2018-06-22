import {
    UPDATE_PINTXOPOTES_SUCESS,
    UPDATE_PINTXOPOTES_ERROR,
    GET_PINTXOPOTE_SUCESS,
    GET_PINTXOPOTE_ERROR
} from './../actions/types';

const initialState = {
    pintxos: [],
    pintxo: {},
    error: ''
};

export default (state = initialState, action) => {
    // console.log('ACTION', action);

    switch (action.type) {
        case UPDATE_PINTXOPOTES_SUCESS:
            return {
                pintxos: action.payload,
                pintxo: state.pintxo,
                error: ''
            };
        case UPDATE_PINTXOPOTES_ERROR:
            return {
                pintxos: [],
                pintxo: state.pintxo,
                error: action.payload
            };
        case GET_PINTXOPOTE_SUCESS:
            return {
                pintxos: state.pintxos,
                pintxo: action.payload,
                error: ''
            };
        case GET_PINTXOPOTE_ERROR:
            return {
                pintxos: state.pintxos,
                pintxo: {},
                error: action.payload
            };
        default:
            return {
                ...state
            };
    }
};
