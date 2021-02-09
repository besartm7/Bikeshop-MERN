import React,{ useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getUserInfo, updateAdminUser } from '../../actions/userAction'
import { USER_UPDATE_ADMIN_RESET } from '../../constants/userConstants'


const UserEditView = ({match, history}) => {
    const userId = match.params.id

    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userInfoDetails = useSelector(state => state.userInfoDetails)
    const { loading, error, user } = userInfoDetails

    const userUpdateAdmin = useSelector(state => state.userUpdateAdmin)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdateAdmin

    


    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }

        if(successUpdate){
            dispatch({ type: USER_UPDATE_ADMIN_RESET })
            history.push('/admin/userlist')
        }else{
            if(!user.name || user._id  !== userId){
                dispatch(getUserInfo(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    },[dispatch, history, userInfo, user, userId, successUpdate])

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(updateAdminUser({
            _id: userId,
            name,
            email,
            isAdmin
        }))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <Card>
                <Card.Body>
                <h3>Edit User</h3>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :(
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type='text' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isadmin'>
                            <Form.Check 
                                type='checkbox' 
                                label='Is Admin?' 
                                checked={isAdmin} 
                                onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                        </Form.Group>
                        <Button type='submit' className='btn-dark btn-block'><i className='fas fa-save'></i>{' '}Save</Button>
                    </Form>
                )}
                
                </Card.Body>
                </Card>
            </FormContainer>
        </>
    )
}

export default UserEditView
