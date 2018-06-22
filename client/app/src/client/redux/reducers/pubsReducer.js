import {
    UPDATE_PUBS_SUCCESS,
    UPDATE_PUBS_ERROR,
    GET_PUB_SUCCESS,
    GET_PUB_ERROR
} from './../actions/types';

const initialState = {
    pubs: [],
    pub: {},
    error: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PUBS_SUCCESS:
            return {
                pubs: action.payload,
                pub: state.pub,
                error: ''
            };
            break;
        case GET_PUB_SUCCESS:
            const newstate = {
                pubs: state.pubs,
                pub: action.payload,
                error: ''
            };

            return newstate;

            break;
        case GET_PUB_ERROR:
            return {
                pubs: state.pubs,
                pub: {},
                error: action.payload
            };
            break;
        default:
            return {
                pubs: state.pubs,
                pub: state.pub,
                error: ''
            };
    }
};
