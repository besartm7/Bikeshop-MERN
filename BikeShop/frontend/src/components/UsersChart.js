import React,{useEffect} from 'react'
import { Pie } from 'react-chartjs-2'
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardUsersData } from '../actions/dashboardAction'

const UsersChart = () => {
  const labelsArray = ['Total', 'Admins', 'Users', 'New']
  const colors = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600']
  const dispatch = useDispatch();

    const dashboardData = useSelector(state => state.dashboardData)
    const { loading, usersdata} = dashboardData
    

    useEffect(()=>{
        dispatch(getDashboardUsersData())
        // eslint-disable-next-line 
    },[dispatch])

  return(
    <>
      <div className='header text-center'>
        <h4 className='title'>Users</h4>
      </div>
      { loading ? ( <Loader />) :(
        
      
        <Pie data={{ 
          labels: labelsArray,
          datasets: [
            {
              label: '# of Votes',
              data: usersdata,
              backgroundColor: colors,
              borderColor: colors,
              borderWidth: 1,
            },
          ],
        }} />
      )}
    </>
  )
}

export default UsersChart

