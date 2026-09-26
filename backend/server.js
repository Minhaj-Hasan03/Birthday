

import express from 'express'
import cors from "cors";
import dotenv from 'dotenv'
import connectDb from './config/mongodb.js';

import birthdayMessageRouter from "./routes/birthdayMessageRoute.js";
dotenv.config() 

const port = process.env.PORT || 5000 ;


const app = express();


app.use(express.json())
app.use(cors());



app.use(
  "/api/birthday-message",
  birthdayMessageRouter
);

app.get("/", (req, res) => {
  res.send("Birthday Backend API is running");
});

app.listen(port, ()=>{
    connectDb();
    console.log( `server is connected in port ${port}`)
})

export default app;