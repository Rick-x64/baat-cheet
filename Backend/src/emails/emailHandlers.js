import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (name, email, clientURL) => {
    try {
        const data = await resendClient.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: email,
            subject: "Welcome to Baat-Cheet!",
            html: createWelcomeEmailTemplate(name, clientURL),
        });

        console.log("Welcome email sent successfully:", data);
        return data;
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email");
    }
};
