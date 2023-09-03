import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { Login, Register, getCurrentUser } from './Controller/Usercontroller.js'
import { addProduct } from './Controller/Sellercontroller.js'

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(morgan("dev"))

app.get("/",(req , res )=>{
  res.send("Working")
})

app.post("/register",Register)
app.post("/login",Login)
app.get("/get-current-user",getCurrentUser)


//seller

app.post("/addproduct",addProduct)

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to DB :)");
})

app.listen(8000,()=>{
    console.log("listening on port 8000:)");
})
