import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const { MONGO_URL } = process.env;
        if (!MONGO_URL) throw new Error("MONGO_URL is not defined in the environment variables");

        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // 1 stands for failure, 0 for success. Exiting the process with a non-zero code indicates an error occurred.
    }
};