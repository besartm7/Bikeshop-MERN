import { 
    SETTING_ITEMSPP_REQUEST,
    SETTING_ITEMSPP_SUCCESS,
    SETTING_ITEMSPP_FAIL,
    SETTING_ITEMSPP_UPDATE_REQUEST,
    SETTING_ITEMSPP_UPDATE_SUCCESS,
    SETTING_ITEMSPP_UPDATE_FAIL,
    SETTING_ITEMSPP_UPDATE_RESET
} from '../constants/settingConstants';

//Items Per Page Reducer
export const settingItemsppReducer = (state = { items:{} }, action)=>{
    switch(action.type){
        case SETTING_ITEMSPP_REQUEST:
            return { loading: true }
        case SETTING_ITEMSPP_SUCCESS:
            return { loading: false, items: action.payload }
        case SETTING_ITEMSPP_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

//Items Per Page Update Reducer
export const updateSettingItemsppReducer = (state = { }, action)=>{
    switch(action.type){
        case SETTING_ITEMSPP_UPDATE_REQUEST:
            return { loading: true }
        case SETTING_ITEMSPP_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case SETTING_ITEMSPP_UPDATE_FAIL:
            return { loading: false, error: action.payload}
        case SETTING_ITEMSPP_UPDATE_RESET:
            return { }
        default:
            return state
    }
}