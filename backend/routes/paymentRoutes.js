const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

router.post('/create-order', authMiddleware, paymentController.createRazorpayOrder);
router.post('/verify', authMiddleware, paymentController.verifyPayment);

module.exports = router;
