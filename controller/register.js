// register.js
import bcrypt from "bcryptjs";
import User from "../model/user.js";

const newUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    
    

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is already in use");
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send("User created successfully");

  } catch (err) {
    console.error("Error during user registration:", err); // 
    res.status(500).send("Something went wrong, please try again later.");
  }
};

export default newUser;
