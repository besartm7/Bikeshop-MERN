import React from 'react';
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Row, Col, Button } from 'react-bootstrap';
import Rating from '../components/Rating';

const Product = ({ bike }) => {


    return (
        <Card className="my-3 rounded h-100">
            <Link to={`/bikes/${bike._id}`} className='p-3'>
                <Card.Img src={bike.image} cariant="top" />
            </Link>
            <Card.Body>
                <Link to={`/bikes/${bike._id}`}>
                    <Card.Title as="div" className="product-box">
                        <strong>{bike.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Row>
                        <Col md={6}>
                            <Rating
                                value={bike.rating}
                                text={`${bike.numReviews}`}
                            />
                        </Col>
                        <Col md={6}>
                            <h6><strong>{bike.price} $</strong></h6>
                        </Col>
                        <Col xs={12}>
                            <LinkContainer to={`/cart/${bike._id}?qty=1`}>
                            <Button
                                className="btn-block mt-3"
                                type="button"
                                variant='outline-dark'
                                disabled={bike.countInStock === 0}
                            ><i className='fas fa-shopping-cart'></i>{' '}
                                {bike.countInStock === 0 ?'Out of stock':'Add to cart'}
                            </Button>
                            </LinkContainer>
                        </Col>
                    </Row>
                    
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
