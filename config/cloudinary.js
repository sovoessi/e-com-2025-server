import {v2 as cloudinary} from 'cloudinary';
import {config} from 'dotenv';

config();

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        console.log("✅ Connected to Cloudinary");
    } catch (error) {
        console.error("❌ Error connecting to Cloudinary:", error.message);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export default connectCloudinary;    