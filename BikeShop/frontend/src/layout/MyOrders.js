import React,{ useState, useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyOrders } from '../actions/orderAction'
import PaginationOnly from '../components/PaginationOnly';
import { getItemspp } from '../actions/settingsAction'  

const MyOrders = ({history, match}) => {
    const pageNumber = match.params.pageNumber || 1
    //const items = match.params.items || 15
    const[items, setItems] = useState()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading:loadingOrders, error:errorOrders, orders, page, pages } = orderListMy

    const settingItemspp = useSelector(state => state.settingItemspp)
    const { items: itemspp } = settingItemspp

    useEffect(()=>{
        //if it is not null, logged user
         if(!userInfo){
             history.push('/login')
         }else{
            if(items)
                dispatch(listMyOrders(pageNumber, items))
            
            if(!itemspp || !itemspp.items)
                dispatch(getItemspp())
            else
                setItems(itemspp.items)
         }
    },[history, userInfo, dispatch, pageNumber, items, itemspp])

    return (
        <Row>
            <Col md={12}>
                <h3 className='text-center'><b>My Orders</b></h3>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> :(
                    <>
                    <Table hover responsive className='table-sm text-center'> 
                        <thead className='dark-bgcolor'>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order =>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? 
                                            (order.paidAt.substring(0, 10)) : 
                                            (<i className='fas fa-times'></i>) 
                                        }
                                    </td>
                                    <td>
                                        {order.isDelivered ? 
                                            (order.deliveredAt.substring(0, 10)) : 
                                            (<i className='fas fa-times'></i>) 
                                        }
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant="outline-dark" className='btn-sm'><i className='fas fa-archive'></i>{' '}Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <PaginationOnly pages={pages} page={page} rout={'/myorders'}/>
                    </>
                )}
            </Col>
        </Row>
    )
}

export default MyOrders
