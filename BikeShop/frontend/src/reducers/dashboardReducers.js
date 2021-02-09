import { 
    DASHBOARD_USERSDATA_REQUEST,
    DASHBOARD_USERSDATA_SUCCESS,
    DASHBOARD_USERSDATA_FAIL,
    DASHBOARD_ORDERDATA_REQUEST,
    DASHBOARD_ORDERDATA_SUCCESS,
    DASHBOARD_ORDERDATA_FAIL,
    DASHBOARD_UNDELIVERED_REQUEST,
    DASHBOARD_UNDELIVERED_SUCCESS,
    DASHBOARD_UNDELIVERED_FAIL
} from '../constants/dashboardConstatns';


export const dashboardDataReducer = (state = {usersdata: []}, action)=>{
    switch(action.type){
        case DASHBOARD_USERSDATA_REQUEST:
            return { loading: true }
        case DASHBOARD_USERSDATA_SUCCESS:
            return { loading: false, usersdata: action.payload }
        case DASHBOARD_USERSDATA_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const dashboardOrdersDataReducer = (state = {ordersdata: []}, action)=>{
    switch(action.type){
        case DASHBOARD_ORDERDATA_REQUEST:
            return { loading: true }
        case DASHBOARD_ORDERDATA_SUCCESS:
            return { loading: false, ordersdata: action.payload }
        case DASHBOARD_ORDERDATA_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const dashboardUndeliveredReducer = (state = {undelivered: []}, action)=>{
    switch(action.type){
        case DASHBOARD_UNDELIVERED_REQUEST:
            return { loading: true }
        case DASHBOARD_UNDELIVERED_SUCCESS:
            return { loading: false, undelivered: action.payload }
        case DASHBOARD_UNDELIVERED_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}