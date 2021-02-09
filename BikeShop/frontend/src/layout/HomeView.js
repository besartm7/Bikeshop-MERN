import React,{ useEffect } from 'react'
import { Row, Col, Container }  from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CarouselBikes from '../components/CarouselBikes';
import { useDispatch, useSelector } from 'react-redux';
import { topRatedBikes } from '../actions/bikeAction';

const HomeView = () => {
    const dispatch = useDispatch();

    const bikeTopRated = useSelector(state => state.bikeTopRated)
    const { loading, error, topbikes} = bikeTopRated

    useEffect(()=>{
        dispatch(topRatedBikes())
    },[dispatch])

    return (
    <>
        <CarouselBikes />
        <Container className='pt-5 pb-5'>
            <h3 className='text-center'>TOP RATED BIKE</h3>
            { loading ? (
                    <Loader />
                ): error ?(
                    <Message variant='danger'>{error}</Message>
                ):(
                    <Row>
                        {topbikes.map(bike => (
                                <Col key={bike._id} sm={12} md={6} xl={4} className='p-3'>
                                    <Product bike={bike} />
                                </Col>
                                )
                            )
                        }
                    </Row>
                )
            }
        </Container>
    </>
    )
}

export default HomeView
