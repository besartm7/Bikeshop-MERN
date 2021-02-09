import React,{ useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { topRatedBikes } from '../actions/bikeAction';



const CarouselBikes = () => {

    const dispatch = useDispatch();

    const bikeTopRated = useSelector(state => state.bikeTopRated)
    const { loading, error, topbikes} = bikeTopRated

    useEffect(()=>{
        dispatch(topRatedBikes())
    },[dispatch])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
        <Carousel>
            {topbikes.map(bike => (
                <Carousel.Item key={bike._id} className='bg-white'>
                    <Link to={`/bikes/${bike._id}`} className='mx-auto'>
                        <Image src={bike.image} alt={bike.name} fluid className='d-block' />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{bike.name}</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default CarouselBikes
