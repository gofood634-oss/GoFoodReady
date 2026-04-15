const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, orderController.createOrder);
router.get('/', authMiddleware, orderController.getUserOrders);
router.get('/admin/all', authMiddleware, adminMiddleware, orderController.getAllOrders);
router.get('/:id', authMiddleware, orderController.getOrder);
router.put('/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);
router.put('/:id/cancel', authMiddleware, orderController.cancelOrder);

module.exports = router;
