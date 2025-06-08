import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
    timeout: 60000, // Set a timeout for the upload operation 60 seconds   
    secure: true, // Use secure URLs
});

export default cloudinary;
