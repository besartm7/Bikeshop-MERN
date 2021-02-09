import express from 'express';
const router = express.Router();
import { getSettingsItemsPerPage, updateSettingsItemsPerPage } from '../controllers/settingsController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/itemspp').get(getSettingsItemsPerPage);
router.route('/itemspp').put(protect, admin, updateSettingsItemsPerPage);

export default router;