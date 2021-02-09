import React from 'react'
import { Route }  from 'react-router-dom'
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector}  from 'react-redux'
import SearchForm from './SearchForm'
import { logout } from '../actions/userAction'

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () =>{
        dispatch(logout())
    }

    return (
        <header>
            <Navbar  collapseOnSelect  className='top-nav'  expand="lg"> 
                <Container fluid>
                    <Navbar.Brand href="/" className="brand-logo"><Image src={`../images/logo.png`} fluid /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto px-4 text-center">
                            <LinkContainer to="/">
                                <Nav.Link className="px-4"><i className='fas fa-home'></i> Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/bikes">
                                <Nav.Link className="px-4"><i className='fas fa-bicycle'></i> Bike Store</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/contact">
                                <Nav.Link className="px-4"><i className='fas fa-phone'></i> Contact</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Route render={({history}) => <SearchForm history={history} />} />
                        <Nav className="ml-auto text-center">
                            {userInfo ? (
                                !userInfo.isAdmin ? (<NavDropdown title={userInfo.name}  id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item><i className='fas fa-user'></i> Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/myorders'>
                                        <NavDropdown.Item><i className='fas fa-user'></i> My Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}><i className='fas fa-sign-out-alt'></i> Logout</NavDropdown.Item>
                                </NavDropdown>):''
                                ) :
                                <Nav.Link href="/login"><i className='fas fa-user'></i> Log In</Nav.Link>
                            } 
                            <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>  
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
