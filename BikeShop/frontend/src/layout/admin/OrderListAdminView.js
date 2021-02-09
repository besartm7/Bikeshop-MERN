import React,{ useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listOrders } from '../../actions/orderAction' 
import PaginationOnly from '../../components/PaginationOnly';
import { getItemspp } from '../../actions/settingsAction'  

const OrderListAdminView = ({history, match}) => {
    const pageNumber = match.params.pageNumber || 1
    const[items, setItems] = useState()

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders, page, pages } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const settingItemspp = useSelector(state => state.settingItemspp)
    const { items: itemspp } = settingItemspp

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            if(items)
                dispatch(listOrders(pageNumber, items))
            
            if(!itemspp || !itemspp.items)
                dispatch(getItemspp())
            else
                setItems(itemspp.items)
        }else{
            history.push('/login')
        }
    },[dispatch, history, userInfo, pageNumber, items, itemspp])

    return (
        <>
            <h3 className='text-center'><b>Orders</b></h3>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
                <>
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
                        {orders.map(order => (
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
                <PaginationOnly pages={pages} page={page} rout={'/admin/orders'}/>
                </>
            )} 
        </>
    )
}

export default OrderListAdminView
