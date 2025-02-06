

//login
import bcrypt from "bcryptjs";
import User from "../model/user.js";

const login =  async (req, res, next) => {
    const { email, password, userName } = req.body;
  
    if (!email || !password) {
      return res.status(400).send("Kindly input your email and password");
    }
  
    try {
      const user = await User.findOne({$or:[{ email, userName}] });
      if (!user) {
        return res.status(400).send("User not found.");
      }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).send("incorrect password");
        }
  
        res.status(200).send({ message: "Login successful!" ,
          email:user.email , username: user.userName
        });
     
    } catch {
      res.status(500).send("Something went wrong. Please try again later.");
    }
  };
  

  export default login;