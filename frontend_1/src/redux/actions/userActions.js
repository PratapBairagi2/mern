import { CLEAR_ERROR, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, GET_ADMIN_USER_FAIL, GET_ADMIN_USER_REQUEST, GET_ADMIN_USER_SUCCESS, GET_USERS_LIST_FAIL, GET_USERS_LIST_REQUEST, GET_USERS_LIST_SUCCESS, PASSWORD_UPDATE_FAIL, PASSWORD_UPDATE_REQUEST, PASSWORD_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_RESET, PROFILE_UPDATE_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_SUCCESS, UPDATE_USER_ADMIN_FAIL, UPDATE_USER_ADMIN_REQUEST, UPDATE_USER_ADMIN_SUCCESS, USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, } from "../types/userTypes"
import axios from "axios"


// register new user
export const registerNewUser = (registerUser) => async (dispatch) => {

    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: { "Content-Type": "application/json" }
        }
        const { data } = await axios.post("/api/register",
            {
                name: registerUser.name,
                email: registerUser.email,
                password: registerUser.password,
                confirmPassword: registerUser.confirmPassword,
                avatar: registerUser.avatar
            },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.error
        })
    }
}

export const loginUser = (loginUserDetails) => async (dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: { "Content-Type": "application/json" }
        }


        const { data } = await axios.post("/api/login", {
            email: loginUserDetails.email,
            password: loginUserDetails.password
        },
            config
        )

        if (data) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
        }

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.error
        })
    }
}

export const userLoad = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOAD_REQUEST
        })

        const { data } = await axios.get("/api/me")

        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        })
    }
}

// user logout
export const userLogOut = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGOUT_REQUEST
        })

        const { data } = await axios.get("/api/logout")

        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        })
    }
}

// update profile
export const updateProfileAction = (updated) => async (dispatch) => {
    try {
        dispatch({
            type: PROFILE_UPDATE_REQUEST
        })
        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        }
        const { data } = await axios.put("/api/me/update", updated, config)

        if (data) {

            dispatch({
                type: PROFILE_UPDATE_SUCCESS,
                payload: data.success
            })

            dispatch({
                type: PROFILE_UPDATE_RESET
            })
        }
    } catch (error) {
        dispatch({
            type: PROFILE_UPDATE_FAIL,
            payload: error.response.data.error
        })
    }
}

export const passwordUpdateAction = (passwords) => async (dispatch) => {
    try {
        dispatch({
            type: PASSWORD_UPDATE_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.put("/api/me/password/change", passwords, config)

        dispatch({
            type: PASSWORD_UPDATE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: PASSWORD_UPDATE_FAIL,
            payload: error.response.data.error
        })
    }
}

// forgot password
export const forgotPasswordAction = (emailId, url) => async (dispatch) => {
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        })

        const config = {
            headers: { "Content-Type": "application/json" }
        }
        const { data } = await axios.post("/api/password/forgot", { email: emailId, url }, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.error
        })
    }
}


// reset password
export const resetPasswordAction = (details) => async (dispatch) => {

    try {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        })

        const config = {
            headers: { "Content-Type": "application/json" }
        }
        const { data } = await axios.put(`/api/password/reset/${details.resetToken}`,
            {
                password: details.newPassword,
                confirmPassword: details.newConfirmPassword
            },
            config
        )

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.error
        })
    }
}

// get users list -- admin
export const getUserListAction = (d) => async (dispatch) =>{

    try {
        dispatch({
            type : GET_USERS_LIST_REQUEST
        })

        const {data} = await axios.get("/api/admin/users")

        dispatch({
            type : GET_USERS_LIST_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type : GET_USERS_LIST_FAIL,
            payload : error.response.data.error
        })
    }
}

// delete user -- admin
 export const deleteAdminUserAction = (id) => async(dispatch) =>{
    try {
        dispatch({
            type : DELETE_USER_REQUEST
        })

        const { data } = await axios.delete(`/api/admin/user/${id}`)

        dispatch({
            type : DELETE_USER_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : DELETE_USER_FAIL,
            payload : error.response.error
        })
    }
}

//  get single user -- admin
export const getAdminUserAction = (id) => async(dispatch) =>{
    try {
        dispatch({
            type : GET_ADMIN_USER_REQUEST
        })

        const {data} = await axios.get(`/api/admin/user/${id}`)

        dispatch({
            type : GET_ADMIN_USER_SUCCESS,
            payload : data
        })
        
    } catch (error) {
        dispatch({
            type : GET_ADMIN_USER_FAIL,
            payload : error.response.data.error
        })
    }
}

// update user/user role -- admin
export const updateUserByAdminAction = (id, user) => async (dispatch) =>{
    try {
        dispatch({
            type : UPDATE_USER_ADMIN_REQUEST
        })
        const {data} = await axios.put(`/api/admin/user/${id}`, user)

        dispatch({
            type : UPDATE_USER_ADMIN_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : UPDATE_USER_ADMIN_FAIL,
            payload : error.response.data.error
        })
    }
}

export const reset_success = () => async(dispatch)=>{
    dispatch({
        type : RESET_SUCCESS
    })
}

//  clear error
export const clearAllError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    })
}