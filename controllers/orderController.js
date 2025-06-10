import Order from "../models/Order.js";
import UserAddress from "../models/UserAddress.js";

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { products, totalAmount, shippingAddress } = req.body;
        const userId = req.user.userId; // assuming auth middleware sets req.user

        // Validate address belongs to user
        const address = await UserAddress.findOne({ _id: shippingAddress, userId });
        if (!address) {
            return res.status(400).json({ message: "Invalid shipping address" });
        }

        const order = await Order.create({
            userId,
            products,
            totalAmount,
            shippingAddress,
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders for logged-in user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orders = await Order.find({ userId })
            .populate("products.productId")
            .populate("shippingAddress");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single order by ID (user can only access their own)
export const getOrderById = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const order = await Order.findOne({ _id: id, userId })
            .populate("products.productId")
            .populate("shippingAddress");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};