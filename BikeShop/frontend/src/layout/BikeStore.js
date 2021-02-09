import React,{ useEffect } from 'react';
import { Row, Col }  from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import PaginationBox from '../components/PaginationBox';
import { useDispatch, useSelector } from 'react-redux';
import { listBikes } from '../actions/bikeAction';


const BikeStore = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const items = match.params.items || 6

    const dispatch = useDispatch();

    const bikeList = useSelector(state => state.bikeList)
    const { loading, error, bikes, page, pages} = bikeList

    useEffect(()=>{
        dispatch(listBikes(keyword, pageNumber, items))
    },[dispatch, keyword, pageNumber, items])

    return (
    <>
        <h2 className='text-center my-5'>BIKE STORE</h2>
        { loading ? (
                <Loader />
            ): error ?(
                <Message variant='danger'>{error}</Message>
            ):(
                <>
                    <Row className='mb-3'>
                        {bikes.map(bike => (
                                <Col key={bike._id} sm={12} md={6} xl={4} className='p-3'>
                                    <Product bike={bike} />
                                </Col>
                                )
                            )
                        }
                    </Row>
                    <PaginationBox pages={pages} page={page} keyword={keyword ?  keyword : ''} />
                </>
            )
        }
    </>
    )
}

export default BikeStore;
