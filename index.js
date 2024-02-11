import express from 'express'
const app= express();

import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'
import  AuthRoute from "./routes/Auth.cjs";
import UserRoute from "./routes/Users.cjs";
import  VideoRoute from "./routes/Video.cjs";

dotenv.config();
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost/location' ,   /* process.env.MONGO_URL, */ {useNewUrlParser: true,
 
 }).then(console.log("connected to mongo db")).catch((err) => console.log(err)); 



 app.use(bodyParser.json());

 app.use("/api/auth", AuthRoute);
 app.use("/api/users", UserRoute);
 app.use("/api/video", VideoRoute);
 app.listen(process.env.PORT  || 5000, ()=> {
    console.log("tobi is king");
})
