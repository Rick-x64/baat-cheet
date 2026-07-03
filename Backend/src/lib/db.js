import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        const { MONGO_URL } = ENV;
        if (!MONGO_URL) throw new Error("MONGO_URL is not defined in the environment variables");

        const conn = await mongoose.connect(ENV.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // 1 stands for failure, 0 for success. Exiting the process with a non-zero code indicates an error occurred.
    }
};