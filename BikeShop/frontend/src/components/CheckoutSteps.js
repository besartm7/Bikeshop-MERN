import React from 'react'
import { Container } from 'react-bootstrap'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
    return (
    <>
        <Container className='mt-5'>
            <ul id="progressbar" className='text-center'>
                <li class={step1 ? 'active':''} id="account"><strong>Login</strong></li>
                <li class={step2 ? 'active':''} id="shipping"><strong>Address</strong></li>
                <li class={step3 ? 'active':''} id="payment"><strong>Payment</strong></li>
                <li class={step4 ? 'active':''} id="order"><strong>Order</strong></li>
            </ul>
        </Container>
    </>
    )
}

export default CheckoutSteps
