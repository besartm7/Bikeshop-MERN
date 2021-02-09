import React,{ useState } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch}  from 'react-redux'
import { Col, Button, Navbar, Nav } from 'react-bootstrap'
import { logout } from '../actions/userAction'
import HRLine from '../components/HRLine'

const AdminSidebar = () => {
    const [active, setActive] = useState('')

    const dispatch = useDispatch()

   

    const logoutHandler = () =>{
        dispatch(logout())
    }

    const sidbarHandler = (e) =>{
        e.preventDefault()
        if(active === '')
            setActive('active')
        else
            setActive('')
    }


    return (
      <>
        <Col className='wrap-sidebar p-0'>
        <Navbar id='sidebar' className={`${active}`}>
          <Col className='sidebar-button'>
            <Button 
              type='button' 
              variant='outline-dark'
              id="sidebarCollapse" 
              onClick={sidbarHandler}
            ><i className={active ?'fa fa-bars':'fa fa-times'}></i></Button>
          </Col>
          <HRLine />

          {/* <Navbar.Brand href="/" className="brand-logo"><Image src={`../images/logo.png`}/></Navbar.Brand> */}
          <Nav className="sidebar-navs">
            <LinkContainer to="/admin/dashboard">
              <Nav.Link className="px-4"><i className='fas fa-chart-line'></i> Main</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/userlist">
              <Nav.Link className="px-4"><i className='fas fa-users'></i> Users </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/bikelist">
              <Nav.Link className="px-4"><i className='fas fa-bicycle'></i> Bikes </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/orders">
              <Nav.Link className="px-4"><i className='fas fa-book'></i> Orders </Nav.Link>
            </LinkContainer>
            <HRLine />
            <LinkContainer to='/profile'>
                <Nav.Link className="px-4"><i className='fas fa-user'></i> Profile </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/myorders'>
                <Nav.Link className="px-4"><i className='fas fa-th-list'></i> My Orders </Nav.Link>
            </LinkContainer>
            <Nav.Link className="px-4" onClick={logoutHandler}><i className='fas fa-sign-out-alt'></i> Logout</Nav.Link>
            <HRLine />
            <LinkContainer to='/admin/settings'>
                <Nav.Link className="px-4"><i className='fas fa-cog'></i> Settings </Nav.Link>
            </LinkContainer>     
          </Nav>
        </Navbar>
        </Col>
      </>
    )
}

export default AdminSidebar
