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
        enum: ["All","electronics", "clothing", "home", "books", "toys", "sports"],
        required: true,
        default: "All"
    },
    gender: {
        type: String,
        enum: ["All","men", "women", "unisex", "kids"],
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