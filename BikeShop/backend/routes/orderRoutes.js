import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import { addOrderItems, getOrderById,updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered, getUndeliveredOrders} from '../controllers/orderController.js'

router.route('/').post(protect, addOrderItems)
router.route('/list').get(protect, admin, getAllOrders)
router.route('/undelivered').get(protect, admin, getUndeliveredOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router;