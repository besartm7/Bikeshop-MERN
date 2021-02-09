import React,{ useState } from 'react'
import {Form, Button, Col, Card, Container, Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartAction'

const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const[paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <Container>
            <CheckoutSteps step1 step2 step3 />
            <h4 className='text-center'>Payment</h4>
            <Row className="justify-content-md-center">
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={submitHandler}>
                                <Form.Group>
                                    <Form.Label as='legend'>Select Method</Form.Label>
                                    <Col>
                                        <Form.Check 
                                            type='radio' 
                                            label='PayPal or CreditCard' 
                                            id='PayPal' 
                                            name='paymentMethod' 
                                            value='PayPal' 
                                            checked 
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        ></Form.Check>
                                    </Col>
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

export default PaymentScreen
