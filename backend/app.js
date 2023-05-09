import express  from "express";
import mongoose from "mongoose";
import router from "./routes/user-route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({ credentials: true, origin:"http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

mongoose.connect("mongodb+srv://sangepusireesha:Qoj0NydyOIh3S6mJ@cluster0.pb9tf8t.mongodb.net/mern-auth?retryWrites=true&w=majority").then(()=>{
    app.listen(5000);
    console.log("Database is connected! Listening to localhost 5000")
}).catch((err) => console.log(err))





// Qoj0NydyOIh3S6mJ 