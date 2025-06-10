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
    images: {
        type: [String],
        required: true,
        trim: true,
    },
    sizes: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        enum: ["all","electronics", "clothing", "home", "books", "toys", "sports"],
        required: true,
        default: "all"
    },
    gender: {
        type: String,
        enum: ["all","men", "women", "unisex", "kids"],
        required: true,
        default: "all"
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