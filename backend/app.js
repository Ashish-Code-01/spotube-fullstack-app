import express from "express";
import dotenv from "dotenv";
import admin from './src/routes/admin/adminRoute.js';
import user from './src/routes/user/userRoute.js';

const app = express();

// Load environment variables if not in production
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/admin", admin);
app.use("/user", user);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Export the app for use in other modules
export default app;
