import React,{ useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserInfo, updateUserInfo } from '../actions/userAction'

const MyProfile = ({history}) => {
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[message, setMessage] = useState(null)

    const dispatch = useDispatch()

    //get user register state
    const userInfoDetails = useSelector(state => state.userInfoDetails)
    const { loading, error, user } = userInfoDetails 

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { success } = userUpdate

    //if loged in redirect
    useEffect(()=>{
        //if it is not null, logged user
         if(!userInfo){
             history.push('/login')
         }else{
             if(!user.name || user._id !== userInfo._id){
                 dispatch(getUserInfo('profile'))
             }else{
                 setName(user.name)
                 setEmail(user.email)
             }
         }
    },[history, userInfo, dispatch, user])

    const submitHandler = (e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        }
        else{
           dispatch(updateUserInfo({id: user._id, name, email, password}))
        }
    }

    return (
        <Row>
            <Col md={{span:6, offset: 3}}>
            <Card className='m-5'>
            <Card.Body>
                <h3 className='text-center'><b>Profile</b></h3>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Update Success</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control type='text' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='Enter password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmpassword'>
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='Confirm password' 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' className='btn-dark btn-block'><i className='fas fa-save'></i>{' '}Save</Button>
                </Form>
            </Card.Body>
            </Card>
            </Col>
        </Row>
    )
}

export default MyProfile
