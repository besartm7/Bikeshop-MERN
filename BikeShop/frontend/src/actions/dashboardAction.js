import axios from 'axios';
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

//Dashboard User Info Get
export const getDashboardUsersData = () => async(dispatch, getState)=>{
    try {
        dispatch({
            type: DASHBOARD_USERSDATA_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/admin/userdata`, config)

        dispatch({
            type: DASHBOARD_USERSDATA_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DASHBOARD_USERSDATA_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//Dashboard Orders Info Get
export const getDashboardOrdersData = () => async(dispatch, getState)=>{
    try {
        dispatch({
            type: DASHBOARD_ORDERDATA_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/admin/monthlyorders`, config)

        dispatch({
            type: DASHBOARD_ORDERDATA_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DASHBOARD_ORDERDATA_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//Dashboard Undelivered Orders
export const getUndeliveredOrders = () => async(dispatch, getState)=>{
    try {
        dispatch({
            type: DASHBOARD_UNDELIVERED_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders/undelivered`, config)

        dispatch({
            type: DASHBOARD_UNDELIVERED_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DASHBOARD_UNDELIVERED_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}