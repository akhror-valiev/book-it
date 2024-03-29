import {
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    CLEAR_ERRORS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_RESET,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
} from "../constants/userConstants";

// Auth reducer

export const authReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                loading: true,
            };
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case REGISTER_USER_SUCCESS:
            return {
                loading: false,
                success: true,
            };

        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case REGISTER_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// User profile reducer

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {
                loading: true,
            };

        case UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
            };

        case UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case UPDATE_PROFILE_RESET:
            return {
                loading: false,
                isUpdated: false,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// User forgot password

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                loading: true,
            };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                loading: false,
                message: action.payload,
            };

        case FORGOT_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
