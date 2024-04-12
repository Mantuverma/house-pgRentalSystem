import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnect from "./utils/dbConnection";
import userRouter from "./route/userRoute";
import cookieParser from "cookie-parser"
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import hotelRouter from "./route/hotelRouter";
import seachRoute from "../src/route/searchRoute"
import morgan from 'morgan';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(morgan('dev'));
const port = process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, "../../frontend/dist")))
app.use("/api/user", userRouter)
app.use("/api/hotel", hotelRouter)
app.use("/api/search", seachRoute)
dbConnect();




app.listen(port, () => {
    console.log(`Server started: http://localhost:${port}`);
});
