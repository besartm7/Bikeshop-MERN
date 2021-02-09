import React,{ useState, useEffect } from 'react'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getItemspp, updateItemspp } from '../../actions/settingsAction' 

import { SETTING_ITEMSPP_UPDATE_RESET } from '../../constants/settingConstants'

const Settings = ({history}) => {
    const[items, setItems] = useState(10)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const settingItemspp = useSelector(state => state.settingItemspp)
    const { items: itemspp } = settingItemspp

    const updateSettingItemspp = useSelector(state => state.updateSettingItemspp)
    const { success } = updateSettingItemspp

    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }
        if(success){
            dispatch({ type: SETTING_ITEMSPP_UPDATE_RESET })
            dispatch(getItemspp())
        }else{
            if(!itemspp || !itemspp.items){
                dispatch(getItemspp())
            }    
            else{
                setItems(itemspp.items)
            }
        } 
    },[dispatch, history, userInfo, itemspp, success])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateItemspp({itemspp: items}))
    }

    return (
        <Row>
            <Col md={{span:6, offset: 3}}>
                <Card className='m-5'>
                    <Card.Body>
                        <h2>Settings</h2>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Items per page:</Form.Label>
                                <Form.Control type='number' placeholder='Enter number' value={items} onChange={(e) => setItems(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button type='submit' className='btn-dark btn-block'><i className='fas fa-save'></i>{' '}Save</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
} 

export default Settings