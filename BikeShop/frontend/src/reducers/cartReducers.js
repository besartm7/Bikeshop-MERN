import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS, 
    CART_SAVE_PAYMENT_METHOD,
    CART_REMOVE_ALL_ITEMS
} from '../constants/cartConstants';

export const cartReducer = (state = {cartItems: [], shippingAddress: {}}, action) =>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItems = state.cartItems.find(x => x.bikeId === item.bikeId)
            if(existItems){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x => x.bikeId === existItems.bikeId ? item : x)
                }
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.bikeId !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case CART_REMOVE_ALL_ITEMS:{
            return{
                cartItems: [],
                shippingAddress: {}
            }
        }
        default:
            return state;
    }
}