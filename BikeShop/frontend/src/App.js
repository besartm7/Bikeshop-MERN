import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Col } from 'react-bootstrap';
import { useSelector}  from 'react-redux'

import Header from './components/Header';
import AdminSidebar from './components/AdminSidebar';
import Footer from './components/Footer';
import HomeView from './layout/HomeView';
import BikeStore from './layout/BikeStore';
import BikeView from './layout/BikeView';
import CartScreen from './layout/CartScreen';
import LoginScreen from './layout/LoginScreen';
import RegisterScreen from './layout/RegisterScreen'
import ShippingScreen from './layout/ShippingScreen'
import PaymentScreen from './layout/PaymentScreen'
import PlaceOrderScreen from './layout/PlaceOrderScreen'
import OrderScreen from './layout/OrderScreen'
import MyProfile from './layout/MyProfile'
import MyOrders from './layout/MyOrders'
import Contact from './layout/Contact'

import UserListView from './layout/admin/UserListView'
import UserEditView from './layout/admin/UserEditView'
import BikeListView from './layout/admin/BikeListView'
import CreateBikeView from './layout/admin/CreateBikeView'
import EditBikeView from './layout/admin/EditBikeView'
import OrderListAdminView from './layout/admin/OrderListAdminView'
import DashboardView from './layout/admin/DashboardView'
import Settings from './layout/admin/Settings'



const App = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Router>
    <Container fluid className='wrapper m-0 p-0'>
        <Col className='col-auto p-0'>
        {userInfo && userInfo.isAdmin && (
          <AdminSidebar />)
        }
        </Col>
        <Col className='p-0'>
          <Header />
          <main>
            <Container className='home-container p-0' fluid>
              <Route path="/" component={HomeView} exact />
            </Container>
            <Container>
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/contact" component={Contact} />
              <Route path="/shipping" component={ShippingScreen} />
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />
              <Route path="/order/:id" component={OrderScreen} />
              <Route path="/bikes" component={BikeStore} exact />
              <Route path="/bikes/page/:pageNumber" component={BikeStore} exact />
              <Route path="/bikes/:id" component={BikeView} exact />
              <Route path="/profile" component={MyProfile} />
              <Route path="/myorders" component={MyOrders} exact />
              <Route path="/myorders/:pageNumber" component={MyOrders} exact />
              <Route path="/admin/settings" component={Settings} exact />

              <Route path="/admin/dashboard" component={DashboardView} />
              <Route path="/admin/userlist" component={UserListView} exact/>
              <Route path="/admin/userlist/:pageNumber" component={UserListView} exact/>
              <Route path="/admin/bikelist" component={BikeListView} exact />
              <Route path="/admin/bikelist/:pageNumber" component={BikeListView} exact />
              <Route path="/admin/bike/create" component={CreateBikeView} />
              <Route path="/admin/bike/:id/edit" component={EditBikeView} />
              <Route path="/admin/user/:id/edit" component={UserEditView} />
              <Route path="/admin/orders" component={OrderListAdminView} exact />
              <Route path="/admin/orders/:pageNumber" component={OrderListAdminView} exact />

              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/search/:keyword" component={BikeStore} exact />
              <Route path="/page/:pageNumber" component={BikeStore} exact />
              <Route path="/search/:keyword/page/:pageNumber" component={BikeStore} exact />
            </Container>
          </main>
          <Footer />
        </Col>

    </Container>
    </Router>
  )
}

export default App;
