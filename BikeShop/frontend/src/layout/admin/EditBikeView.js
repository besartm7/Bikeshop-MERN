import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Image, Row, Col} from 'react-bootstrap'
import FormLargeContainer from '../../components/FormLargeContainer'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import ExtractBikeColor from '../../components/ExtractBikeColor'
import { ColorExtractor } from 'react-color-extractor'
import { deleteBike, detailsBike, updateBike } from '../../actions/bikeAction'
import { BIKE_UPDATE_RESET } from '../../constants/bikeConstants'

const EditBikeView = ({match, history}) => {
    const bikeId = match.params.id

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

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const bikeDetails = useSelector(state => state.bikeDetails)
    const {loading, error, bike} = bikeDetails

    const bikeUpdate = useSelector(state => state.bikeUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = bikeUpdate


    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }else{
            if(successUpdate){
                dispatch({ type: BIKE_UPDATE_RESET })
                dispatch(detailsBike(bikeId))
            }else{
                if(bike && bike._id !== bikeId){
                    dispatch(detailsBike(bikeId))
                }else{
                    setImage(bike.image)
                    setName(bike.name)
                    setBrand(bike.brand)
                    setCategory(bike.category)
                    setPrice(bike.price)
                    setCountInStock(bike.countInStock)
                    setDescription(bike.description)
                    setColors(bike.colors)
                }
            }
        }  
    },[dispatch, history, bikeId, successUpdate, bike, userInfo])

    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure?')){
            dispatch(deleteBike(id))
            history.push('/admin/bikelist')
        }
    }

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

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(updateBike({
            _id: bikeId,
            image,
            name,
            brand, 
            category,
            price,
            countInStock,
            description,
            colors
        }))
    }

    return (
        <FormLargeContainer>
            <Card>
                <Card.Body>
                    <h3 className='text-center mb-5'>Edit Bike <i className='fas fa-bicycle'></i></h3>
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :(
                    <Form onSubmit={submitHandler} className='col-sm-12'>
                        <Form.Group as={Row} controlId='image'>
                            <Col xs={12} md={3}>
                                <Image 
                                    src={fileUpload 
                                            ? URL.createObjectURL(fileUpload) 
                                            : `${bike.image}`
                                            ? `${bike.image}` 
                                            : defaultImg
                                        } 
                                    alt={bike.name} 
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
                                    src={newUpload 
                                        ? URL.createObjectURL(fileUpload) 
                                        : `${bike.image}`
                                        ? `${bike.image}` 
                                        : null
                                    } 
                                    getColors={colorsArray => {
                                        if(newUpload){
                                            setColors(colorsArray)
                                            setNewUpload(false)
                                        }
                                            
                                    }}
                                />
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
                                <Button type='submit' variant='outline-dark'>
                                    <i className='fas fa-edit'> </i> 
                                    Update
                                </Button>
                            </Col>
                            <Col xs={6} className="text-left">
                                <Button variant='outline-danger' onClick={() => deleteHandler(bike._id)}>
                                    <i className='fas fa-trash'> </i> Delete
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

export default EditBikeView
