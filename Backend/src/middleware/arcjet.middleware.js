import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req)
        if (decision.isDenied) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Rate limit exceeded, please try again later." });
            }
            else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Access denied, bot detected." });

            } else {
                return res.status(403).json({ message: "Access denied, request denied by Security policy." });
            }
        }
        //check for spoofed bot
        if (Decesion.result.some(isSpoofedBot)) {
            return res.status(403).json({ error: "spoofed bot detected", message: "Malicious activity detected." });
        }
    } catch (error) {
        console.error("Error in arcjetProtection:", error);
        //res.status(500).json({ message: "Internal server error" });
        next();
    }

}