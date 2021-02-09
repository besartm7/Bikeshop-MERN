import React,{ useState } from 'react'
import {Form, Button, Card, Container, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartAction'


const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({
            address, city, postalCode, country
        }))
        history.push('/payment')
    }

    return (
        <Container>
            <CheckoutSteps step1 step2 />
            <h4 className='text-center'>Shipping</h4>
            <Row className="justify-content-md-center">
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={submitHandler} >
                                <Form.Group controlId='address'>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter address'
                                        required
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='city'>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter city'
                                        required
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='postalcode'>
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter zip code'
                                        required
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='country'>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Country'
                                        required
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Button type='submit' className='btn-block btn-dark'>Continue</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ShippingScreen
