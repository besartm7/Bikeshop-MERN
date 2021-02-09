import React,{ useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import UsersChart from '../../components/UsersChart'
import MonthlyOrders from '../../components/MonthlyOrders'
import UndeliveredOrders from '../../components/UndeliveredOrders'

const DashboardView = ({history}) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }
    },[history, userInfo])
    return (
        <Row className='mt-5'>
            <Col md={6} xs={12}><UsersChart /></Col>
            <Col md={6} xs={12}><MonthlyOrders /></Col>
            <Col xs={12} className='mt-5'><UndeliveredOrders /></Col>
        </Row>
    )
}

export default DashboardView
