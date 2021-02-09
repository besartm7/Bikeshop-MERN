import React,{ useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart} from '../actions/cartAction';

const CartScreen = ({match, location, history}) => {
    const bikeID = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(()=>{
        if(bikeID){
            dispatch(addToCart(bikeID, qty))
        }
    },[dispatch, bikeID, qty])

    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id))
    }

    const checkoutHandler =()=>{
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={12}>
                <h2>Your Shoping Card</h2>
                
                { cartItems === 0 ? 
                    <Message>Your cart is empty. <Link to='/'>Go Back</Link></Message> : 
                    <ListGroup variant="flush" className="text-center">
                        <Row>
                            <Col md={2}><b>Image</b></Col>
                            <Col md={4}><b>Name</b></Col>
                            <Col md={2}><b>Price</b></Col>
                            <Col md={2}><b>Quatity</b></Col>
                            <Col md={2}><b>Action</b></Col>
                        </Row>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.bikeId}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={4}>
                                        <Link to={`/bikes/${item.bikeId}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Button 
                                            variant="outline-secondary" 
                                            className="mr-3" 
                                            type="button" 
                                            onClick={(e)=> item.qty > 1 ?
                                                dispatch(addToCart(item.bikeId, Number(item.qty-1))) :
                                                dispatch(addToCart(item.bikeId, Number(item.qty)))
                                            }
                                        >-
                                        </Button> 
                                        {item.qty} 
                                        <Button 
                                            variant="outline-primary" 
                                            className="ml-3" 
                                            type="button" 
                                            onClick={(e)=> item.qty < item.countInStock ?
                                                dispatch(addToCart(item.bikeId, Number(item.qty+1))) :
                                                dispatch(addToCart(item.bikeId, Number(item.qty)))
                                            }
                                        >+
                                        </Button>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='outline-dark' onClick={() => removeFromCartHandler(item.bikeId)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                }
            </Col>
            <Col md={12}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h4>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block btn-dark' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
