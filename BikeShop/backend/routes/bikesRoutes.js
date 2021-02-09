import express from 'express';
const router = express.Router();
import { 
    getBikes, 
    getBikeById, 
    deleteBikeById, 
    createBike,
    updateBike,
    createBikeReview,
    getTopRatedBikes
} from '../controllers/bikesController.js';
import { protect, admin } from '../middleware/authMiddleware.js'



router.route('/')
    .get(getBikes)
    .post(protect, admin, createBike)
router.route('/top').get(getTopRatedBikes)
router.route('/:id')
    .get(getBikeById)
    .delete(protect, admin, deleteBikeById)
    .put(protect, admin, updateBike)
    
router.route('/:id/reviews').post(protect, createBikeReview)


export default router;