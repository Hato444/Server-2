import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('productId');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new order
router.post('/', async (req, res) => {
    try {
        const { customerName, quantity, shippingDetails } = req.body;

        // Ensure all required fields are present
        if (!customerName || !quantity || !shippingDetails) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newOrder = new Order({ ...req.body, status: 'Pending' });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update an order (if not shipped)
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order.status === 'Shipped') {
            return res.status(400).json({ error: 'Cannot update a shipped order' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an order
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        res.json(deletedOrder);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
