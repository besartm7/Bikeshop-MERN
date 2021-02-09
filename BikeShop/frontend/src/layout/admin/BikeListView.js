import React,{ useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import PaginationBox from '../../components/PaginationBox'; 
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listBikes, deleteBike } from '../../actions/bikeAction'
import { getItemspp } from '../../actions/settingsAction' 
import { BIKE_CREATE_RESET } from '../../constants/bikeConstants'


const BikeListView = ({history, match}) => {
    const pageNumber = match.params.pageNumber || 1
    const[items, setItems] = useState(10)

    const dispatch = useDispatch()

    const bikeList = useSelector(state => state.bikeList)
    const { loading, error, bikes, page, pages } = bikeList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const bikeDelete = useSelector(state => state.bikeDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = bikeDelete

    const bikeCreate = useSelector(state => state.bikeCreate)
    const{  success: successCreate, bike: createdBike} = bikeCreate

    const settingItemspp = useSelector(state => state.settingItemspp)
    const { items: itemspp } = settingItemspp

    useEffect(()=>{
        dispatch({type: BIKE_CREATE_RESET})
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }else{
            if(!itemspp || !itemspp.items)
                dispatch(getItemspp())
            else
                setItems(itemspp.items)
        }

        if(successCreate){
            history.push(`/admin/bikelist`)
        }else{
            if(items)
                dispatch(listBikes('',pageNumber, items))
        }
        
    },[dispatch, history, userInfo, successCreate, createdBike, successDelete, pageNumber, items, itemspp])

    const createBikeHandler = () =>{
        history.push('/admin/bike/create')
    }

    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure?')){
            dispatch(deleteBike(id))
        }
    }
    return (
        <>
            <Row>
                <Col className="text-right">
                    <Button className='my-3 btn-sm' variant="outline-dark" onClick={createBikeHandler}>
                        <i className='fas fa-plus'></i>{' '}Create Bike
                    </Button>
                </Col>
            </Row>
            <h3 className='text-center'><b>Bikes</b></h3>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
            <>
                <Table hover responsive className='table-sm text-center'>
                    <thead className='dark-bgcolor'>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>BRAND</th>
                            <th>CATEGORY</th>
                            <th>PRICE</th>
                            <th>IN STOCK</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bikes.map(bike => (
                            <tr key={bike._id}>
                                <td>{bike._id}</td>
                                <td>{bike.name}</td>
                                <td>{bike.brand}</td>
                                <td>{bike.category}</td>
                                <td>{bike.price}</td>
                                <td>{bike.countInStock}</td>
                                <td>
                                    <LinkContainer to={`/admin/bike/${bike._id}/edit`}>
                                        <Button variant='outline-dark' className='btn-sm'><i className='fas fa-edit'></i></Button>
                                    </LinkContainer>
                                    {' '}
                                    <Button variant='outline-danger' className='btn-sm' onClick={() => deleteHandler(bike._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <PaginationBox pages={pages} page={page} isAdmin={true} />
            </>
            )}
            
        </>
    )
}

export default BikeListView
