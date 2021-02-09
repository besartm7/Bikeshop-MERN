import User from '../models/userModel.js'
import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'



//@desc Get UsersRegisteredData
//@route GET /api/admin/userdata
//@access Private Admin
const getUsersData = asyncHandler(async (req, res) =>{
    const total = await User.find({}).countDocuments()
    const adminUsers = await User.find({ isAdmin: true }).countDocuments()
    const simpleUsers = await User.find({ isAdmin: false }).countDocuments()

    const date = new Date()

    const thisMonthUsers = await User.find({ "createdAt":  {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),     //firstDayofCurrentMonth
        $lt: new Date(date.getFullYear(), date.getMonth() + 1, 0)   //lastDayofCurrentMonth
      } }).countDocuments()
      
    const userData = [total, adminUsers, simpleUsers, thisMonthUsers]

    res.json(userData)
})

//@desc Get Orders monthly
//@route GET /api/admin/monthlyorders
//@access Private Admin
const getMonthlyOrdersData = asyncHandler(async (req, res) =>{
  let yeartoday = new Date().getFullYear();

  const monthlyOfThisYear = await Order.aggregate([
    { "$group": {
      "_id": {year: {"$year":'$createdAt'}, month: { "$month": "$createdAt" }},
      "total": { "$sum": 1 }
    }},
    { "$sort": { "_id": 1 } }
  ])

  let filtered = monthlyOfThisYear.filter(d => d._id.year === yeartoday)

  let monthly = [0,0,0,0,0,0,0,0,0,0,0,0]

  filtered.map((f, index) => {
    monthly[f._id.month-1] = f.total
  })

  res.json(monthly)
})

export {
    getUsersData,
    getMonthlyOrdersData
}