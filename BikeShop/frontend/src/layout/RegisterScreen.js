import React,{ useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userAction'


const RegisterScreen = ({location, history}) => {
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[message, setMessage] = useState(null)

    const dispatch = useDispatch()

    //get user register state
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

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
        if(password !== confirmPassword){
            setMessage('Password do not match')
        }
        else{
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <Card>
            <Card.Body>
            <h3 className='text-center'><b>Sign Up</b></h3>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Control 
                        className='input-form-style' 
                        type='text' 
                        placeholder='Name' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Control 
                        className='input-form-style' 
                        type='text' 
                        placeholder='E-mail' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Control 
                        className='input-form-style'
                        type='password' 
                        placeholder='Enter password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmpassword'>
                    <Form.Control 
                        className='input-form-style'
                        type='password' 
                        placeholder='Confirm password' 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' className='btn-dark btn-block'>Register</Button>
            </Form>
            <Row>
                <Col>
                    Have another account {' '}
                    <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Login</Link>
                </Col>
            </Row>
            </Card.Body>
            </Card>
        </FormContainer>
    )
}

export default RegisterScreen
