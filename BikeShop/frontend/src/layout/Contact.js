import React from 'react'
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';

const Contact = () => {
    return (
    <Row className='justify-content-md-center mt-5'>
        
        <Col md={6} xs={12} className='text-center'>
            <Card>
                <Card.Body>
                    <Image src={'images/b-link-p.jpg'} roundedCircle responsive alt='besart' className='profile-image mb-3' />
                    <ListGroup>
                        <ListGroup.Item action><b>Besart Mullabazi</b> <br /> Fascinated always in Web Development & Software Engineer including Graphic Design, Hacking and SEO - Internet Marketing.</ListGroup.Item>
                        <ListGroup.Item action><b>FullStack</b>: MERN (Mongodb, Expressjs, Reactjs, Nodejs)</ListGroup.Item>
                        <ListGroup.Item action><b>Other: </b>HTML, CSS, JavaScript, jQuery, PHP, Java, Hibernate, SpringBoot, C++</ListGroup.Item>
                        <ListGroup.Item action><b>Database: </b>SQL, MySQL, Pl/SQL, MongoDB</ListGroup.Item>
                        <ListGroup.Item action><b>Graphic Designer: </b>Photoshop, Illustrator</ListGroup.Item>
                        <ListGroup.Item action>
                            <a href='https://www.linkedin.com/in/besartm/' className='btn btn-sm btn-outline-info' rel="noreferrer" target='_blank'>Linkedin</a>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    )
}

export default Contact
