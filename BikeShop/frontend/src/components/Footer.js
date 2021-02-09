import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className='footer-bottom'>
            <Container>
                <Row>
                    <Col className='text-center py-3'>Copyright &copy; BikeShop 2020</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
