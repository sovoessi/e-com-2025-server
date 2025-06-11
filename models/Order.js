import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled", "processing"],
        default: "pending",
    },
    paymentMethod: {
        type: String,
        enum: ["credit_card", "paypal", "bank_transfer"],
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;