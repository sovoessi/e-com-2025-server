import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";


import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js"; // Ensure cloudinary is configured

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Welcome to the E-Com2025 API");
});

app.use('/api/v1/auth', authRoutes)

const startServer = async () => {
    try {
        await connectDB();
        await connectCloudinary(); // Ensure Cloudinary is connected
        console.log("✅ Connected to Cloudinary");
        app.listen(PORT, () => {
            console.log(`✅ Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error starting the server:", error.message);
        process.exit(1); // Exit the process with failure
    }
}

startServer();