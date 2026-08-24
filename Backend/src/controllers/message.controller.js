import User from "../models/User.js";
import Message from "../models/message.js";
import cloudinary from "../lib/cloudinary.js"; // Import your cloudinary configuration


export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // Assuming you have the authenticated user's ID in req.user
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); // Exclude the password field from the results, and exclude the logged-in user from the results

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ],
        });

        res.status(200).json(messages);
        // const messages = await Message.find({ $or: [{ sender: req.user._id, receiver: myId }, { sender: myId, receiver: req.user._id }] }).populate("sender receiver", "name email");

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error fetching messages:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image); // Implement this function based on your storage solution
            // Assuming you have a function to handle image upload and return the URL
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,                            // sender: req.user._id,
            receiverId,                            // receiver: receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        // TODO: Emit the message to the receiver using Socket.IO or any other real-time communication method if needed


        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error sending message:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        // find  all the messages where the logged-in user is either the sender or the receiver
        const messages = await Message.find({
            $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
        });

        // const chatPartnerIds 
    } catch (error) {
        console.log("Error fetching chat partners:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}
