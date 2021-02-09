import React,{ useState } from 'react'
import { Form, InputGroup, Button} from 'react-bootstrap'

const SearchForm = ({history}) => {
    const[ keyword, setKeyword] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} inline className='search-header'>
            <InputGroup>
                <Form.Control
                    className='search-input'
                    type='text'
                    name='q'
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="search..."

                />
                <InputGroup.Append>
                    <Button className='search-btn' type='submit' variant="outline-secondary"> <i className='fas fa-search'> </i></Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    )
}

export default SearchForm
