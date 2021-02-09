import express from 'express';
const router = express.Router();
import { getUsersData, getMonthlyOrdersData } from '../controllers/dashboardController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/userdata').get(protect, admin, getUsersData)
router.route('/monthlyorders').get(protect, admin, getMonthlyOrdersData)

export default router;