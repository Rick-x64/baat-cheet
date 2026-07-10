//const express = require("express");
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageroutes from "./routes/message.route.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

const app = express();

const FRONTEND_DIST = path.join(process.cwd(), "Frontend", "dist");

console.log("Current working directory:", process.cwd());
console.log("Frontend dist:", FRONTEND_DIST);
console.log("Exists:", fs.existsSync(FRONTEND_DIST));

app.get("/health", (req, res) => {
    res.json({ ok: true });
});
const PORT = ENV.PORT || 3000;

app.use(express.json()); // req.body

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageroutes);

//cors

import cors from "cors";

app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());

// Serve frontend if built (works in production or when dist is present)
if (fs.existsSync(FRONTEND_DIST)) {
    app.use(express.static(FRONTEND_DIST));
    app.get("*", (_, res) => {
        res.sendFile(path.join(FRONTEND_DIST, "index.html"));
    });
} else {
    console.warn(`Frontend dist not found at ${FRONTEND_DIST}. Static files won't be served.`);
}


// Start server after DB connection
const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

start();
