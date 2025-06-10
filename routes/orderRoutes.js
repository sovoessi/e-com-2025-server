import express from "express";
import {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    getAllOrders
} from "../controllers/orderController.js";
import { authenticate, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, getUserOrders);
router.get("/admin", authenticate, isAdmin, getAllOrders); // Get all orders (admin only)
// Place order payment stripe webhook route
router.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
    // Handle Stripe webhook events here
    // This is a placeholder; actual implementation will depend on your Stripe setup
    res.status(200).send("Webhook received");
});
router.post('/:id/pay', authenticate, (req, res) => {
    const { id } = req.params;
    // Logic to handle payment for the order with the given id
    // This is a placeholder; actual implementation will depend on your payment setup
    res.status(200).json({ message: `Payment processed for order ${id}` });
});

router.get("/:id", authenticate, getOrderById);
router.put("/:id", authenticate, isAdmin, updateOrderStatus); 
router.delete("/:id", authenticate, isAdmin, deleteOrder); 



export default router;