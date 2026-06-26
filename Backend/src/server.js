//const express = require("express");
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageroutes from "./routes/message.route.js";
import path from "path";





dotenv.config();
const app = express();
const __dirname = path.resolve();

const PORT = process.env.port || 3000;

console.log(process.env.port);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageroutes);

//make ready for production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")))
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
