import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, ...rest } = req.body;
        let imageUrls = [];

        // Handle single or multiple images
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file =>
                cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
                    if (error) throw error;
                    return result.secure_url;
                })
            );
            // Use Promise.all with streams
            imageUrls = await Promise.all(
                req.files.map(
                    file =>
                        new Promise((resolve, reject) => {
                            const stream = cloudinary.uploader.upload_stream(
                                { folder: 'products' },
                                (error, result) => {
                                    if (error) reject(error);
                                    else resolve(result.secure_url);
                                }
                            );
                            stream.end(file.buffer);
                        })
                )
            );
        }

        const product = new Product({
            name,
            price,
            description,
            images: imageUrls,
            ...rest,
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

