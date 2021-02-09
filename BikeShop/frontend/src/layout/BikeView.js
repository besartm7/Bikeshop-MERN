import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import Rate from "../components/Rate";
import BikeColor from '../components/BikeColor';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { detailsBike, createBikeReview } from '../actions/bikeAction';
import { BIKE_CREATE_REVIEW_RESET } from '../constants/bikeConstants'

const BikeView = ({ history, match }) => {
    const[qty, setQty] = useState(1);
    const[rating, setRating] = useState(0);
    const[comment, setComment] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const bikeDetails = useSelector(state => state.bikeDetails)
    const { loading, error, bike } = bikeDetails;

    const bikeCreateReview = useSelector(state => state.bikeCreateReview)
    const { error: errorReview, success: successReview } = bikeCreateReview;

    useEffect(()=>{
        
        if(successReview){
            alert('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({type: BIKE_CREATE_REVIEW_RESET})
        }
        dispatch(detailsBike(match.params.id))
    },[dispatch,  match, successReview])

    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHanlder = (e) =>{
        e.preventDefault()
        dispatch(createBikeReview(match.params.id, {rating, comment}))
    }

    const changeRate = (props) =>{
        setRating(props)
    }

    return (
    <>
        <Link className="btn btn-dark my-3" to="/">
            Go Back
        </Link>
        { loading ? (
                <Loader />
            ): error ?(
                <Message variant='danger'>{error}</Message>
            ):(
            <>
                <Row>
                    <Col md={6}>
                        <Image src={bike.image} alt={bike.name} fluid />
                    </Col>
                    <Col md={6}>
                        <ListGroup>
                            <ListGroup.Item>
                                <h4><strong>{bike.name}</strong></h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <BikeColor bikeColors={bike.colors || []} />
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={6}><b>Brand:</b> {bike.brand}</Col>
                                    <Col md={6}>
                                        <Rating
                                            value={bike.rating}
                                            text={`${bike.numReviews}`}
                                        />
                                    </Col> 
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item><b>Description:</b> {bike.description}</ListGroup.Item>
                        </ListGroup>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col><b>Status:</b> {bike.countInStock > 0 ? `${bike.countInStock} In Stock` : "Out of Stock"}</Col>
                                    </Row>
                                </ListGroup.Item>
                                { bike.countInStock > 0 &&(
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={6}><b>Quantity:</b> </Col>
                                            <Col md={6}>
                                                <Button 
                                                    variant="outline-secondary" 
                                                    className="mr-3" 
                                                    type="button" 
                                                    onClick={(e)=>(qty > 1)?setQty(qty-1):setQty(qty)}
                                                >-
                                                </Button> 
                                                {qty} 
                                                <Button 
                                                    variant="outline-primary" 
                                                    className="ml-3" 
                                                    type="button" 
                                                    onClick={(e)=>(qty < bike.countInStock)?setQty(qty+1):setQty(qty)}
                                                >+
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={6}><b>Price:</b> ${bike.price}</Col>
                                        <Col md={6}>
                                        <Button
                                            onClick={addToCartHandler}
                                            className="btn-block"
                                            type="button"
                                            variant='outline-dark'
                                            disabled={bike.countInStock === 0}
                                        ><i className='fas fa-shopping-cart'></i>{' '}
                                            Add to cart
                                        </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup></Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <h3>Reviews</h3>
                        {bike.reviews.length === 0 && <Message>No Reviews</Message>}
                        <ListGroup variant='flush'>
                            {bike.reviews.map(review =>(
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item>
                                <h2>Write a Customer Review</h2>
                                {errorReview && (<Message variant='danger'>{errorReview}</Message>)}
                                {userInfo 
                                ? (
                                    <Form onSubmit={submitHanlder}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Rate ratevalue={rating} rateChange={changeRate} />
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Button type='submit' variant='outline-dark'>
                                            Submit
                                        </Button>
                                    </Form>
                                ) 
                                : <Message>Please <Link to='/login'>sign in</Link> to write review</Message>}
                                </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </>
            )
        }
    </>
    )
}

export default BikeView
