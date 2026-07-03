//const express = require("express");
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageroutes from "./routes/message.route.js";
import path from "path";
import { connect } from "http2";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";





console.log(ENV.JWT_SECRET);
const app = express();
const __dirname = path.resolve();
const FRONTEND_DIST = path.resolve(__dirname, "../../Frontend/dist");


const PORT = ENV.PORT || 3000;



console.log("Server port:", PORT);

app.use(express.json()); //req.body

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageroutes);

// make ready for production
if (ENV.NODE_ENV === "production") {
    app.use(express.static(FRONTEND_DIST));
    app.get("*", (_, res) => {
        res.sendFile(path.join(FRONTEND_DIST, "index.html"));
    });
}

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()

});
