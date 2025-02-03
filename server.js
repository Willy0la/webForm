

// Server.js

import express from "express";
import connectDB from "./db.js";
import bcrypt from "bcryptjs";
import User from "./model/user.js";
import login from "./router/login.js";
import newUser from "./router/register.js"; 
import { Server } from "http";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.post("/register", newUser )


app.post("/login", login);

app.listen(3090, () => {
    console.log("Server started on port 3090");
  });