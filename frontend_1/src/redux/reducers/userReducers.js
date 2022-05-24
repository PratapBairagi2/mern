import { CLEAR_ERROR, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, GET_ADMIN_USER_FAIL, GET_ADMIN_USER_REQUEST, GET_ADMIN_USER_SUCCESS, GET_USERS_LIST_FAIL, GET_USERS_LIST_REQUEST, GET_USERS_LIST_SUCCESS, PASSWORD_UPDATE_FAIL, PASSWORD_UPDATE_REQUEST, PASSWORD_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_RESET, PROFILE_UPDATE_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_SUCCESS, UPDATE_USER_ADMIN_FAIL, UPDATE_USER_ADMIN_REQUEST, UPDATE_USER_ADMIN_SUCCESS, USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../types/userTypes"

const initialState = {
    loading: false,
    user: null,
    success: false,
}
export const UserReducer = (state = initialState, action) => {

    switch (action.type) {

        // register start
        case USER_REGISTER_REQUEST:
            return {
                loading: true,
                user: null,
                isAuthenticated: false,
                success: false,
                registerUserCall: true

            }

        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                success: true,
                registerUserCall: true
            }

        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
                registerUserCall: true

            }
        // register end

        // login satrt
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
                user: null,
                isAuthenticated: false,
                success: false,
                loginUserCall: true
            }

        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                success: true,
                loginUserCall: true

            }

        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
                loginUserCall: true

            }
        // login end

        // user load start
        case USER_LOAD_REQUEST:
            return {
                loading: true,
                user: null,
                isAuthenticated: false,
                success: false,
                loggedUserCall: true
            }
        case USER_LOAD_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                success: true,
                loggedUserCall: true

            }
        case USER_LOAD_FAIL:
            return {
                loading: false,
                user: null,
                success: false,
                isAuthenticated: false,
                error: action.payload,
                loggedUserCall: true

            }
        // user load end

        // logout start
        case USER_LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case USER_LOGOUT_SUCCESS:
            return {
                loading: false,
                success: true,
                isAuthenticated: false,
                user: null
            }
        case USER_LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        // logout end

        case RESET_SUCCESS :
            return{
                ...state,
                success : false
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


// update profile
export const UpdateProfileReducer = (
    state = {
        loading: false,
        updated: false,
        success: false,
        error: null
    }, action) => {

    switch (action.type) {
        case PROFILE_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                updated: action.payload,
            }

        case PROFILE_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const PasswordChangeReducer = (
    state = {
        loading: false,
        success: false,
        error: null
    }, action) => {

    if (state.success) {
        setTimeout(() => {
            return state.success = false
        }, 500)
    }

    switch (action.type) {

        case PASSWORD_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PASSWORD_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            }

        case PASSWORD_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

// forgot password
export const ForgotPasswordReducer = (
    state = {
        loading: false,
        success: false,
        error: null
    }, action) => {

    if (state.success) {
        setTimeout(() => {
            state.success = false
        }, 500)
    }

    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                loading: true
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case FORGOT_PASSWORD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                error: null,
                ...state
            }
        default:
            return state

    }
}

// reset password
export const ResetPasswordReducer = (
    state = {
        loading: false,
        success: false,
        error: null
    }, action) => {

    if (state.success) {
        setTimeout(() => {
            state.success = false
        }, 500)
    }

    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                loading: true
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case RESET_PASSWORD_FAIL:
            return {
                success: false,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                error: null,
                ...state
            }
        default:
            return state
    }
}

// get users list -- admin
export const GetUsersListReducer = (
    state = {
        loading: false,
        success: false,
        users: [],
        error: null
    },
    action) => {

    switch (action.type) {
        case GET_USERS_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_USERS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                users: action.payload
            }
        case GET_USERS_LIST_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

// delete user -- admin
export const DeleteAdminUserReducer = (
    state = {
        loading: false,
        success: false,
        error: null
    },
    action) => {

    switch (action.type) {
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case DELETE_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case RESET_SUCCESS:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default: return state
    }
}

//  get admin user -- admin
export const GetAdminUserReducer = (
    state = {
        loading: false,
        success: false,
        user: {},
        error: null
    },
    action) => {

    switch (action.type) {
        case GET_ADMIN_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ADMIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                user: action.payload.user
            }
        case GET_ADMIN_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case RESET_SUCCESS:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default: return state
    }
}


// update user/user role -- admin
export const UpdateUserByAdminReducer = (
    state={
        loading : false,
        success : false,
        user : {},
        error : null
    }, 
    action) => {

    switch (action.type) {
        case UPDATE_USER_ADMIN_REQUEST:
            return {
                ...state,
                loading : true
            }
        case UPDATE_USER_ADMIN_SUCCESS:
            return {
                ...state,
                loading : false,
                success : true,
                user : action.payload
            }
        case UPDATE_USER_ADMIN_FAIL:
            return {
                ...state,
                error : action.payload
            }
        case RESET_SUCCESS:
            return {
                ...state,
                success : false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error : null
            }
        default: return state
    }
}