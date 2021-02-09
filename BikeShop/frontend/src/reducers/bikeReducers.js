import { 
    BIKE_LIST_REQUEST, 
    BIKE_LIST_SUCCESS, 
    BIKE_LIST_FAIL,
    BIKE_REQUEST,
    BIKE_SUCCESS,
    BIKE_FAIL,
    BIKE_DELETE_REQUEST,
    BIKE_DELETE_FAIL,
    BIKE_DELETE_SUCCESS,
    BIKE_CREATE_SUCCESS,
    BIKE_CREATE_REQUEST,
    BIKE_CREATE_FAIL,
    BIKE_CREATE_RESET,
    BIKE_UPDATE_REQUEST,
    BIKE_UPDATE_SUCCESS,
    BIKE_UPDATE_FAIL,
    BIKE_UPDATE_RESET,
    BIKE_CREATE_REVIEW_SUCCESS,
    BIKE_CREATE_REVIEW_REQUEST,
    BIKE_CREATE_REVIEW_FAIL,
    TOP_BIKE_REQUEST,
    TOP_BIKE_SUCCESS,
    TOP_BIKE_FAIL,
    BIKE_CREATE_REVIEW_RESET
} from '../constants/bikeConstants';

export const bikeListReducer = (state = {bikes: []}, action)=>{
    switch (action.type){
        case BIKE_LIST_REQUEST:
            return { loading: true, bikes: []}
        case BIKE_LIST_SUCCESS:
            return { loading: false, bikes: action.payload.bikes, pages: action.payload.pages, page: action.payload.page}
        case BIKE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const bikeReducer = (state = {bike: {reviews: [] } }, action)=>{
    switch (action.type){
        case BIKE_REQUEST:
            return { loading: true, ...state}
        case BIKE_SUCCESS:
            return { loading: false, bike: action.payload }
        case BIKE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const bikeDeleteReducer = (state = {}, action)=>{
    switch (action.type){
        case BIKE_DELETE_REQUEST:
            return { loading: true}
        case BIKE_DELETE_SUCCESS:
            return { loading: false, success: true }
        case BIKE_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const bikeCreateReducer = (state = {}, action)=>{
    switch (action.type){
        case BIKE_CREATE_REQUEST:
            return { loading: true}
        case BIKE_CREATE_SUCCESS:
            return { loading: false, success: true, bike: action.payload }
        case BIKE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case BIKE_CREATE_RESET:
            return { }
        default:
            return state
    }
}

export const bikeUpdateReducer = (state = {bike:{}}, action)=>{
    switch (action.type){
        case BIKE_UPDATE_REQUEST:
            return { loading: true}
        case BIKE_UPDATE_SUCCESS:
            return { loading: false, success: true, bike: action.payload }
        case BIKE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case BIKE_UPDATE_RESET:
            return { bike: {} }
        default:
            return state
    }
}

export const bikeCreateReviewReducer = (state = {}, action)=>{
    switch (action.type){
        case BIKE_CREATE_REVIEW_REQUEST:
            return { loading: true}
        case BIKE_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case BIKE_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case BIKE_CREATE_REVIEW_RESET:
            return { }
        default:
            return state
    }
}

export const bikeTopRatedReducer = (state = { topbikes: [] }, action)=>{
    switch (action.type){
        case TOP_BIKE_REQUEST:
            return { loading: true, topbikes: []}
        case TOP_BIKE_SUCCESS:
            return { loading: false, topbikes: action.payload }
        case TOP_BIKE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
