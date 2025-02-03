import bcrypt from "bcryptjs";
import User from "./model/user.js";

const login =  async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send("Kindly input your email and password");
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("User not found.");
      }
  
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
          return res.status(400).send("incorrect password");
        }
  
        res.status(200).send({ message: "Login successful!" });
     
    } catch {
      res.status(500).send("Something went wrong. Please try again later.");
    }
  };
  

  export default login;