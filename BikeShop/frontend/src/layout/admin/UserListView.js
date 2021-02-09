import React,{ useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listUsers, deleteUser } from '../../actions/userAction' 
import { getItemspp } from '../../actions/settingsAction' 
import PaginationOnly from '../../components/PaginationOnly';

const UserListView = ({history, match}) => {
    const pageNumber = match.params.pageNumber || 1
    const[items, setItems] = useState()

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users, pages, page } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    const settingItemspp = useSelector(state => state.settingItemspp)
    const { items: itemspp } = settingItemspp

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            if(items)
                dispatch(listUsers(pageNumber, items))
            if(!itemspp || !itemspp.items)
                dispatch(getItemspp())
            else
                setItems(itemspp.items)
        }else{
            history.push('/login')
        }
        
    },[dispatch, history, userInfo, successDelete, pageNumber, items, itemspp])

    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(id))
        }
    }
    return (
        <>
            <h3 className='text-center'><b>Users</b></h3>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
                <>
                <Table hover responsive className='table-sm text-center'>
                    <thead className='dark-bgcolor'>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? 
                                        (<i className='fas fa-check'></i>) 
                                        :(<i className='fas fa-times'></i>)}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='outline-dark' className='btn-sm'><i className='fas fa-edit'></i></Button>
                                    </LinkContainer>
                                    <Button variant='outline-danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <PaginationOnly pages={pages} page={page} rout={'/admin/userlist'}/>
                </>
            )}
            
        </>
    )
}

export default UserListView
