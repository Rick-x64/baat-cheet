import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("jwt", token, {

        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // prevents xxs attacks by restricting access to the cookie from client-side scripts
        sameSite: "strict", // ensures the cookie is sent only to the same site, preventing CSRF attacks
        secure: process.env.NODE_ENV === "development" ? false : true // ensures the cookie is sent only over HTTPS in production
    });

    return token;
};  