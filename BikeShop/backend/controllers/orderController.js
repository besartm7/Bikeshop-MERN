import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js'
import Bike from '../models/bikesModel.js'
import {minusCountInStockofBike} from './bikesController.js'


//@desc Create new order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) =>{
    const {
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
    } = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
        return
    }else{
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        //update countinstock of Bikes
        minusCountInStockofBike(order.orderItems)
        

       const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

//@desc Update order to paid
//@route Put /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found!')
    }
})

//@desc Update order to delivered
//@route Put /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered= asyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        
        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found!')
    }
})

//@desc Get Order by Id
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found!')
    }
})

//@desc Get User logged in user order
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) =>{
    const pageItems = Number(req.query.items) || 10
    const page = Number(req.query.pageNumber) || 1

    const count = await Order.countDocuments({ user: req.user._id })
    const orders = await Order.find({user: req.user._id}).limit(pageItems).skip(pageItems * (page-1))
 
    res.json({orders, page, pages: Math.ceil(count /pageItems)})
})

//@desc Get all orders
//@route GET /api/orders/list
//@access Private/Admin
const getAllOrders = asyncHandler(async (req, res) =>{ 
    const pageItems = Number(req.query.items) || 10
    const page = Number(req.query.pageNumber) || 1

    const count = await Order.countDocuments({ })
    const orders = await Order.find({}).populate('user', 'id name').limit(pageItems).skip(pageItems * (page-1)) //id and name from user associated

    res.json({orders, page, pages: Math.ceil(count /pageItems)})
})

//@desc Get User logged in user order
//@route GET /api/orders/myorders
//@access Private / Admin
const getUndeliveredOrders = asyncHandler(async (req, res) =>{
    const undelivered = await Order.find({isPaid: true, isDelivered: false}).limit(10)
    res.json(undelivered)
})

export{
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getAllOrders,
    updateOrderToDelivered,
    getUndeliveredOrders
}