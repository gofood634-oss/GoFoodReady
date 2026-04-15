const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurant);
router.post('/', authMiddleware, adminMiddleware, restaurantController.createRestaurant);
router.put('/:id', authMiddleware, adminMiddleware, restaurantController.updateRestaurant);
router.delete('/:id', authMiddleware, adminMiddleware, restaurantController.deleteRestaurant);

module.exports = router;
