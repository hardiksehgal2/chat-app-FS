const Message = require("../models/message.model");
const User = require("../models/user.model");
const cloudinary = require("cloudinary").v2;

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    //$ne is used to exclude the logged in user from the list of users
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json({ users: filteredUser });
  } catch (error) {
    console.error("Get users for sidebar error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    // User to chat id is the id of the user to chat with
    const { id: userToChatId } = req.params;
    // Sender id is the logged in user
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: -1 });
    res.status(200).json({ messages });
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const newMessage = new Message({
      senderId,
      receiverId: userToChatId,
      text,
    });

    if (image) {
      try {
        const uploadImage = await cloudinary.uploader.upload(image);
        newMessage.image = uploadImage.secure_url;
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return res.status(400).json({ message: "Image upload failed" });
      }
    }

    const savedMessage = await newMessage.save();
    console.log("message sent successfully ",savedMessage);
    res.status(201).json(savedMessage);

  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUsersForSidebar, getMessages, sendMessage };
