import React,{ useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader';
import { getUndeliveredOrders } from '../actions/dashboardAction' 

const UndeliveredOrders = () => {

    const dispatch = useDispatch()

    const dashboardUndelivered = useSelector(state => state.dashboardUndelivered)
    const { loading, error, undelivered } = dashboardUndelivered

    useEffect(()=>{
        dispatch(getUndeliveredOrders())
    },[dispatch])

    return (
        <>
            <h3 className='text-center'><b>Undelivered Orders</b></h3>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
                <Table hover responsive className='table-sm text-center'>
                    <thead className='dark-bgcolor'>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {undelivered.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>$ {order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? 
                                        (order.paidAt.substring(0, 10)) 
                                        :(<i className='fas fa-times'></i>)}
                                </td>
                                <td>
                                    {order.isDelivered ? 
                                        (order.deliveredAt.substring(0, 10)) 
                                        :(<i className='fas fa-times'></i>)}
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
            )} 
        </>
    )
}

export default UndeliveredOrders
