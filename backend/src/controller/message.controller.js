import User from '../model/user.model.js';
import Message from '../model/message.model.js';
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users for sidebar:", error.message);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

export const getMessages = async (req, res) => {
    try {
      const {id:userToChatId}=req.params;
      const senderId = req.user._id;
      const messages = await Message.find({
          $or: [
              { sender: senderId, receiver: userToChatId },
              { sender: userToChatId, receiver: senderId }
          ]
      });
      res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessages = async (req, res) => {
    try {
        const{text,image}=req.body;
        const{id:receiverId}=req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });
        await newMessage.save();
        // Real time functionalty 
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error.message);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}
