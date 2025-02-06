import User from "../model/user.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";


const isValidObjectId = mongoose.Types.ObjectId.isValid;


const hashPasswordIfProvided = async (password) => {
  if (!password) return null;  
  return await bcrypt.hash(password, 12); 
};

const update = async (req, res) => {
  const { userId } = req.params;
  const { email, password, username } = req.body;

  try {
   
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    
    if (password) {
      const hashedPassword = await hashPasswordIfProvided(password);
      req.body.password = hashedPassword;
    }


    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });


    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });

  } catch (error) {

    console.error('Error updating user:', error.message || error);


    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default update;
