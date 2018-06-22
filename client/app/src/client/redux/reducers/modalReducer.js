import { TOGGLE_MODAL } from './../actions/types';

const initialState = {
    isOpen: false,
    id: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return {
                isOpen: state.isOpen ? false : true,
                id: action.payload
            };
        default:
            return state;
    }
};
