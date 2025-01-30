import express from 'express';
import connectDB from './db.js';
import ejs from 'ejs';
import mongoose from 'mongoose';
import { EventEmitter } from 'events';
import { fileURLToPath } from 'url';
import path from 'path';
import bcrypt from 'bcryptjs'


EventEmitter.prototype._maxListeners = 100;



const app = express();

app.use(express.static('public'))
;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


connectDB();


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 }
});

const User = mongoose.model('User', userSchema);

app.get(['/' , "/home"], (req, res) => {
  res.render('home');  
});


app.get('/login', async (req, res) => {
    try {
      res.render('login');
    } catch (err) {
      res.status(500).send(err.message);
    }
});

app.post('/submit', async (req, res) => {
    const { firstName, lastName, email, password, conpassword } = req.body;

    if (password !== conpassword) {
        return res.status(400).send('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      conpassword  
    });

    try {
       
        await user.save();
        res.status(201).send('User created successfully');
    } catch (err) {
        res.status(500).send("something went wrong");
    }
});

  app.get("/about", async (req,res)=>{
    try{
        res.render("about")

    }catch(err){
        res.status(500).send("Error from internal server")
    }

  })


  app.get("/faq",async(req,res)=>{
    try{
        res.render("faq")
    }catch(err){
        res.status(500).send("Error from internal server")
    }
  })

app.listen(3090, () => {
    console.log("Server started on port 3090");
  });
  
