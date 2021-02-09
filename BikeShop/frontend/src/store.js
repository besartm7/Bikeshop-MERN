import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { bikeListReducer, bikeReducer, bikeDeleteReducer, bikeCreateReducer, bikeUpdateReducer, bikeCreateReviewReducer, bikeTopRatedReducer } from './reducers/bikeReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userInfoReducer, userUpdateReducer, userListReducer, userDeleteReducer,userUpdateAdminReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers'
import { dashboardDataReducer, dashboardOrdersDataReducer, dashboardUndeliveredReducer } from './reducers/dashboardReducers'
import { settingItemsppReducer, updateSettingItemsppReducer } from './reducers/settingsReducers'

const reducer = combineReducers({
    bikeList: bikeListReducer,
    bikeDetails: bikeReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userInfoDetails: userInfoReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdateAdmin: userUpdateAdminReducer,
    bikeDelete:bikeDeleteReducer,
    bikeCreate:bikeCreateReducer,
    bikeUpdate: bikeUpdateReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    bikeCreateReview: bikeCreateReviewReducer,
    bikeTopRated: bikeTopRatedReducer,
    dashboardData: dashboardDataReducer,
    dashboardOrdersData: dashboardOrdersDataReducer,
    settingItemspp: settingItemsppReducer,
    updateSettingItemspp: updateSettingItemsppReducer,
    dashboardUndelivered: dashboardUndeliveredReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage 
    },
    userLogin: {userInfo: userInfoFromStorage},


};

const middleware = [thunk];

const store = createStore(
    reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))
);

export default store;