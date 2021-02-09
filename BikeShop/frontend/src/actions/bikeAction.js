import axios from 'axios';
import { 
    BIKE_LIST_REQUEST, 
    BIKE_LIST_SUCCESS, 
    BIKE_LIST_FAIL,
    BIKE_REQUEST,
    BIKE_SUCCESS,
    BIKE_FAIL,
    BIKE_DELETE_REQUEST,
    BIKE_DELETE_SUCCESS,
    BIKE_DELETE_FAIL,
    BIKE_CREATE_FAIL,
    BIKE_CREATE_SUCCESS,
    BIKE_CREATE_REQUEST,
    BIKE_UPDATE_REQUEST,
    BIKE_UPDATE_SUCCESS,
    BIKE_UPDATE_FAIL,
    BIKE_CREATE_REVIEW_REQUEST,
    BIKE_CREATE_REVIEW_FAIL,
    BIKE_CREATE_REVIEW_SUCCESS,
    TOP_BIKE_FAIL,
    TOP_BIKE_SUCCESS,
    TOP_BIKE_REQUEST
} from '../constants/bikeConstants';

export const topRatedBikes = () => async(dispatch) =>{
    try {
        dispatch({type: TOP_BIKE_REQUEST});
        const { data } = await axios.get('/api/bikes/top');

        dispatch({
            type: TOP_BIKE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TOP_BIKE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listBikes = (keyword = '', pageNumber = '', items = '') => async(dispatch) =>{
    try {
        dispatch({type: BIKE_LIST_REQUEST});
        const { data } = await axios.get(`/api/bikes?keyword=${keyword}&pageNumber=${pageNumber}&items=${items}`);
        dispatch({
            type: BIKE_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BIKE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const detailsBike = (id) => async(dispatch) =>{
    try {
        dispatch({type: BIKE_REQUEST});
        const { data } = await axios.get(`/api/bikes/${id}`);
        dispatch({
            type: BIKE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BIKE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const deleteBike = (id) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: BIKE_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/bikes/${id}`, config)

        dispatch({
            type: BIKE_DELETE_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: BIKE_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createBike = (bike) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: BIKE_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const{ data } = await axios.post(`/api/bikes`, bike, config)

        dispatch({
            type: BIKE_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BIKE_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateBike = (bike) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: BIKE_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const{ data } = await axios.put(`/api/bikes/${bike._id}`, bike, config)

        dispatch({
            type: BIKE_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BIKE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createBikeReview = (bikeId,  review) => async(dispatch, getState)=>{
    try {
        dispatch({
            type: BIKE_CREATE_REVIEW_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/bikes/${bikeId}/reviews`, review, config)

        dispatch({
            type: BIKE_CREATE_REVIEW_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: BIKE_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
