import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_INFO_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_INFO_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_ADMIN_RESET,
    USER_UPDATE_ADMIN_FAIL,
    USER_UPDATE_ADMIN_SUCCESS,
    USER_UPDATE_ADMIN_REQUEST
} from '../constants/userConstants';

export const userLoginReducer = (state = { }, action)=>{
    switch (action.type){
        case USER_LOGIN_REQUEST:
            return { loading: true}
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

//User Regiser
export const userRegisterReducer = (state = { }, action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

//User Info
export const userInfoReducer = (state = { user:{} }, action)=>{
    switch(action.type){
        case USER_INFO_REQUEST:
            return { ...state, loading: true }
        case USER_INFO_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_INFO_FAIL:
            return { loading: false, error: action.payload}
        case USER_INFO_RESET:
            return { user: {}}
        default:
            return state
    }
}

//User update
export const userUpdateReducer = (state = { }, action)=>{
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

//User list
export const userListReducer = (state = { users: [] }, action)=>{
    switch(action.type){
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { 
                loading: false, users: action.payload.users, pages: action.payload.pages, page: action.payload.page
            }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload}
        case USER_LIST_RESET:
            return { users: []}
        default:
            return state
    }
}

//User delete
export const userDeleteReducer = (state = { }, action)=>{
    switch(action.type){
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

//User update /Admin
export const userUpdateAdminReducer = (state = { user: {} }, action)=>{
    switch(action.type){
        case USER_UPDATE_ADMIN_REQUEST:
            return { loading: true }
        case USER_UPDATE_ADMIN_SUCCESS:
            return { loading: false, success: true }
        case USER_UPDATE_ADMIN_FAIL:
            return { loading: false, error: action.payload}
        case USER_UPDATE_ADMIN_RESET:
            return { user: {}}
        default:
            return state
    }
}