import aj from "../lib/arcjet.js";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({
                    message: "Rate limit exceeded, please try again later."
                });
            }

            if (decision.reason.isBot()) {
                return res.status(403).json({
                    message: "Access denied, bot detected."
                });
            }

            return res.status(403).json({
                message: "Access denied, request denied by Security policy."
            });
        }

        next();

    } catch (error) {
        console.error("Error in arcjetProtection:", error);
        next();
    }
};