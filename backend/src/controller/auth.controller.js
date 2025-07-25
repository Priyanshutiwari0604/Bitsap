import generateToken from "../lib/utils.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js"; // Assuming you have a cloudinary setup
export const signup = async(req, res) => {
    // first we need a database
    const { email, fullName, password } = req.body;
    try {
        // hashing the password
        if(!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });

        }
        const user=await User.findOne({ email})
        if(user) {
            return res.status(400).json({ message: "User already exists" });

        }
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            fullName,
            password: hashedPassword
        });
        if(newUser){
            //generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({ message: "User created successfully", user: {
                email: newUser.email,
                fullName: newUser.fullName,
                profilePicture: newUser.profilePicture,
                createdAt: newUser.createdAt,
            } });
        }
        else{
            res.status(400).json({ message: "Invalid user data" });
        }
       
    } catch (error) {
        console.error("Error during signup:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login =async (req, res) => {
    const { email, password } = req.body;
    
    try {
       const user= await User.findOne({ email }) 
       if(!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        //generate jwt token
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
        })
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({ message: "Internal server error" });
        
    }
};

export const logout = async(req, res) => {
    try {
        res.clearCookie("jwt","",{maxAge:0});
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error during logout:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async(req, res) => {
    try {
        const {profilePicture} = req.body;
        const userId=req.user._id;
        if(!profilePicture) {
            return res.status(400).json({ message: "Profile picture is required" });
        }
        const uploadResponse=await cloudinary.uploader.upload(profilePicture);
        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilePicture: uploadResponse.secure_url
        }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error checking authentication:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};