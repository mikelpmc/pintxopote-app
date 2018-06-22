import {
    FETCH_USER_SUCCESS,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGOUT_USER,
    UPDATE_PROFILE_ERROR
} from './../actions/types';

const initialState = {
    auth: false,
    user: {},
    error: '',
    success: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return {
                auth: true,
                user: action.payload,
                error: '',
                success: ''
            };
        case UPDATE_USER_SUCCESS:
            return {
                auth: true,
                user: action.payload,
                error: '',
                success: 'Usuario actualizado con éxito'
            };
        case UPDATE_USER_ERROR:
            return {
                auth: false,
                user: {},
                error: action.payload,
                success: ''
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state
            };
        case REGISTER_USER_ERROR:
            return {
                auth: false,
                user: {},
                error: action.payload,
                success: ''
            };
        case LOGOUT_USER:
            return {
                auth: false,
                user: {},
                error: '',
                success: ''
            };
        case UPDATE_PROFILE_ERROR:
            return {
                auth: true,
                user: state.user,
                error: action.payload,
                success: ''
            };
        default:
            return {
                auth: state.auth,
                user: state.user,
                error: '',
                success: ''
            };
    }
};
