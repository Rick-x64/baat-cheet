import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";


export const socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startWith("jwt="))
            ?.split("=")[1];

        if (!token) {
            console.log("Socket authentication failed: No token provided");
            return next(new Error("Authentication error: No token provided"));
        }
        // verify the token
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            console.log("Socket authentication failed: Invalid token");
            return next(new Error("Authentication error: Invalid token"));
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            console.log("Socket authentication failed: User not found");
            return next(new Error("Authentication error: User not found"));
        }

        socket.user = user; // Attach user to socket object
        socket.userId = user._id.toString(); // Attach userId to socket object

        console.log(`Socket authentication successful for user: ${user.fullName} (${user._id})`);
        next(); // Proceed to the next middleware or event handler


    } catch (error) {
        console.error("Socket authentication error:", error);
        next(new Error("Authentication error: " + error.message));
    }
};