import Order from "../models/Order.js";

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { products, totalAmount, shippingAddress, paymentMethod } = req.body;
        const userId = req.user.userId;
        if (!products || !totalAmount || !shippingAddress || !paymentMethod) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const order = await Order.create({
            userId,
            products,
            totalAmount,
            shippingAddress,
            paymentMethod,
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
            .populate("shippingAddress")
            .sort({ createdAt: -1 }); // Sort by most recent first
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

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // e.g., "shipped", "delivered", "cancelled"
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate("products.productId").populate("shippingAddress");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an order (admin only)
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders (admin only)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("userId", "name email") // Populate user details
            .populate("products.productId") // Populate product details
            .sort({ createdAt: -1 }); // Sort by most recent first
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Place order payment stripe webhook route
export const stripeWebhook = (req, res) => {
    // Handle Stripe webhook events here
    // This is a placeholder; actual implementation will depend on your Stripe setup
    res.status(200).send("Webhook received");
};

// Sripe payment place order route
export const placeOrderPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod } = req.body;
        if (!orderId || !paymentMethod) {
            return res.status(400).json({ message: "Order ID and payment method are required" });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update the order with payment details
        order.paymentMethod = paymentMethod;
        order.paymentStatus = "completed"; // Assuming payment is successful
        await order.save();

        res.status(200).json({ message: "Payment successful", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Paypal payment place order route
export const placeOrderPaypal = async (req, res) => {
    try {
        const { orderId, paymentDetails } = req.body;
        if (!orderId || !paymentDetails) {
            return res.status(400).json({ message: "Order ID and payment details are required" });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update the order with payment details
        order.paymentMethod = "paypal";
        order.paymentStatus = "completed"; // Assuming payment is successful
        await order.save();

        res.status(200).json({ message: "Payment successful", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};