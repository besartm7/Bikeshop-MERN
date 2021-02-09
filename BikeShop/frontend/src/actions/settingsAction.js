import axios from 'axios'
import { 
    SETTING_ITEMSPP_REQUEST,
    SETTING_ITEMSPP_SUCCESS,
    SETTING_ITEMSPP_FAIL,
    SETTING_ITEMSPP_UPDATE_REQUEST,
    SETTING_ITEMSPP_UPDATE_SUCCESS,
    SETTING_ITEMSPP_UPDATE_FAIL
} from '../constants/settingConstants';

export const getItemspp = () => async(dispatch, getState) =>{
    try {
        dispatch({type: SETTING_ITEMSPP_REQUEST});
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/api/settings/itemspp', config);
        dispatch({
            type: SETTING_ITEMSPP_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SETTING_ITEMSPP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateItemspp = (itemspp) => async(dispatch, getState) =>{
    try {
        dispatch({type: SETTING_ITEMSPP_UPDATE_REQUEST});
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put('/api/settings/itemspp', itemspp, config);

        dispatch({
            type: SETTING_ITEMSPP_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SETTING_ITEMSPP_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}