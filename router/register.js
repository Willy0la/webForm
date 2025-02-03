import bcrypt from "bcryptjs";
import User from "./model/user.js"




const newUser = async (req, res) => {
  const { firstName, lastName, email, password, conpassword } = req.body;

  try {
    if (password !== conpae1ssword) {
      return res.status(400).send("Passwords do not match");
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
    res.status(500).send("something went wrong");
  }
};

export default newUser;