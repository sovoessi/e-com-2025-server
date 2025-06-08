import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: Array,
        required: true,
        trim: true,
    },
    sizes: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        enum: ["electronics", "clothing", "home", "books", "toys", "sports"],
        required: true,
        default: "All"
    },
    gender: {
        type: String,
        enum: ["men", "women", "unisex", "kids"],
        required: true,
        default: "All"
    },
    bestSeller: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);
export default Product;