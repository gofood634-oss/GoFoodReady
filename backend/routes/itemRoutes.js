const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/', itemController.getAllItems);
router.get('/restaurant/:restaurantId', itemController.getItemsByRestaurant);
router.get('/:id', itemController.getItem);
router.post('/', authMiddleware, adminMiddleware, itemController.createItem);
router.put('/:id', authMiddleware, adminMiddleware, itemController.updateItem);
router.delete('/:id', authMiddleware, adminMiddleware, itemController.deleteItem);

module.exports = router;
