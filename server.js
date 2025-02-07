

// Server.js

import express from "express";
import connectDB from "./db.js";
import bcrypt from "bcryptjs";

import login from "./controller/login.js";
import newUser from "./controller/register.js"; 
import { Server } from "http";
import newId from "./controller/user-id.js"
import update from "./controller/update.js";
import deleteUser from "./controller/delete.js";



const app = express();
const route =express.Router()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

route.post("/register", newUser )
route.post("/login", login);
route.put("/:userId", update);  
route.delete("/:userId", deleteUser);



app.listen(3070, () => {
    console.log("Server started on port 3070");
  });