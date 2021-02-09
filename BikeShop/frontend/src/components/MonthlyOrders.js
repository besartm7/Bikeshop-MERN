import React,{ useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardOrdersData } from '../actions/dashboardAction'

const MonthlyOrders = () => {
    const labelsArray  = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const colors = ["#399283", "#39eec0", "#294d46", "#a2e1ca", "#42952e", "#a7d64e", "#744822", "#ebaa8c", "#b02949", "#ec4b18", "#f79302", "#ff0087"]
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }
    const dispatch = useDispatch();

    const dashboardOrdersData = useSelector(state => state.dashboardOrdersData)
    const { loading, ordersdata} = dashboardOrdersData
    
    useEffect(()=>{
      dispatch(getDashboardOrdersData())
      // eslint-disable-next-line
    },[dispatch])

    return (
        <> 
          <div className='header text-center'>
            <h4 className='title'>This year orders</h4>
          </div>
          { loading ? ( <Loader />) :(
            
            <Bar 
              data={{
                labels: labelsArray,
                datasets: [{
                  label: '# orders',
                  data: ordersdata,
                  backgroundColor: colors,
                  borderColor: colors,
                  borderWidth: 1,
                }]
              }} 
              options={options}
            />
          )}
        </>
    )
}

export default MonthlyOrders