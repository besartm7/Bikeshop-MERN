import React,{ useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userAction'


const LoginScreen = ({location, history}) => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    //if loged in redirect
    useEffect(()=>{
        //if it is not null, logged user
         if(userInfo){
             history.push(redirect)
         }
    },[history, userInfo, redirect])

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <Card>
            <Card.Body>
            <h3 className='text-center'><b>Login</b></h3>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Control 
                        className='input-form-style'
                        type='text' 
                        placeholder='E-mail' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    {/* <Form.Label>Password:</Form.Label> */}
                    <Form.Control 
                        className='input-form-style'
                        type='password' 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' className='btn-dark btn-block'><i className='fas fa-sign-in-alt'></i>{' '}Login</Button>
            </Form>
            <Row>
                <Col>
                    No account {' '}
                    <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>Register</Link>
                </Col>
            </Row>
            </Card.Body>
            </Card>
        </FormContainer>
    )
}

export default LoginScreen
