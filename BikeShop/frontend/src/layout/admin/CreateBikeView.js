import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Image, Row, Col} from 'react-bootstrap'
import FormLargeContainer from '../../components/FormLargeContainer'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import ExtractBikeColor from '../../components/ExtractBikeColor'
import { ColorExtractor } from 'react-color-extractor'
import { createBike } from '../../actions/bikeAction'

const CreateBikeView = ({history}) => {
    const[image, setImage] = useState('')
    const defaultImg = '/images/default.jpg'
    const[name, setName] = useState('')
    const[brand, setBrand] = useState('')
    const[category, setCategory] = useState('')
    const[price, setPrice] = useState(0)
    const[countInStock, setCountInStock] = useState(0)
    const[colors, setColors] = useState([])
    const[description, setDescription] = useState('')
    const[uploading, setUploading] = useState(false)
    const[newUpload, setNewUpload] = useState(false)
    const[fileUpload, setFileUpload] = useState('')

    const dispatch = useDispatch()
    
    const bikeCreate = useSelector(state => state.bikeCreate)
    const {loading, error, success} = bikeCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin)
            history.push('/login')

        if(success)
            history.push('/admin/bikelist')
           
    },[history, success, userInfo])

    const uploadFileHandler = async (e) =>{
        const file= e.target.files[0]
        setFileUpload(file)
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers:{
                    'Content-Type': 'multipart/form-data'
                } 
            }
            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
            setNewUpload(true)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const removeColorHandler = (e) =>{
        const filteredColors = colors.filter(color => color !== e)
        setColors(filteredColors)
    }

    const clearHandler = () =>{
        setImage('')
        setName('')
        setBrand('')
        setCategory('')
        setPrice(0)
        setCountInStock(0)
        setColors([])
        setDescription('')
        setFileUpload('')
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(createBike({
            image,
            colors,
            name,
            brand,
            category,
            price,
            countInStock,
            description
        }))
    }

    return (
        <FormLargeContainer>
            <Card>
                <Card.Body>
                    <h3 className='text-center mb-5'>Create Bike <i className='fas fa-bicycle'></i></h3>
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :(
                    <Form onSubmit={submitHandler} className='col-sm-12'>
                        <Form.Group as={Row} controlId='image'>
                            <Col xs={12} md={3}>
                                <Image 
                                    src={fileUpload 
                                            ? URL.createObjectURL(fileUpload) 
                                            : defaultImg
                                        } 
                                    alt={name} 
                                    style={{width: 100}} 
                                    thumbnail
                                        
                                />
                            </Col>
                            <Col xs={12} md={9}>
                                <Form.Label>Upload bike image:</Form.Label> 
                                <Form.File 
                                    id='image-file' 
                                    label={image ? image : 'Choose File'} 
                                    custom
                                    onChange={uploadFileHandler}
                                >{uploading && <Loader />}</Form.File>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='colors'>
                            <Form.Label column xs={12} md={3}>Colors:</Form.Label>
                            <Col xs={12} md={9} className='editbike-colors'>
                                <ColorExtractor
                                    getColors={colorsArray => {
                                        if(newUpload){
                                            setColors(colorsArray)
                                            setNewUpload(false)
                                        }
                                            
                                    }}
                                ><img src={newUpload 
                                    ? URL.createObjectURL(fileUpload)
                                    : ''
                                } alt='' /></ColorExtractor>
                                <ExtractBikeColor bikeColors={colors || []} removeColorHandler={removeColorHandler} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='name'>
                            <Form.Label column xs={12} md={3}>Name:</Form.Label>
                            <Col xs={12} md={9}>
                                <Form.Control
                                    type='text' 
                                    placeholder='name' 
                                    value={name} 
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                >    
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='brand'>
                            <Form.Label column xs={12} md={3}>Brand:</Form.Label>
                            <Col xs={12} md={9}>
                                <Form.Control 
                                    type='text' 
                                    placeholder='brand' 
                                    value={brand} 
                                    onChange={(e) => setBrand(e.target.value)}
                                ></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='category'>
                            <Form.Label column xs={12} md={3}>Category:</Form.Label>
                            <Col xs={12} md={9}>
                                <Form.Control 
                                    type='text' 
                                    placeholder='category' 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                ></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='price'>
                            <Form.Label column xs={12} md={3}>Price:</Form.Label>
                            <Col xs={12} md={9}>
                                <Form.Control 
                                    type='number' 
                                    placeholder='price' 
                                    value={price} 
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='countInStock'>
                            <Form.Label column xs={12} md={3}>Count in Stock:</Form.Label>
                            <Col xs={12} md={9}>
                                <Form.Control 
                                    type='number' 
                                    placeholder='count in stock' 
                                    value={countInStock} 
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='Description'>
                            <Form.Label column xs={12} md={3}>Description:</Form.Label>
                            <Col xs={12} md={9}>
                                <Form.Control 
                                    as='textarea'
                                    rows={3}
                                    placeholder='description' 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Col>
                        </Form.Group>
                        <Row className='mt-5'>
                            <Col xs={6} className="text-right">
                                <Button type='submit' variant='outline-primary'>
                                    <i className='fas fa-save'></i>{' '}Save
                                </Button>
                            </Col>
                            <Col xs={6} className="text-left">
                                <Button variant='outline-danger' onClick={clearHandler}>
                                    <i className='fas fa-broom'> </i> {' '} Clear
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    )}
                </Card.Body>
            </Card>
        </FormLargeContainer>
    )
}

export default CreateBikeView
