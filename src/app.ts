import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes"
import authRoutes from "./routes/authRoutes"
import cookieParser from "cookie-parser"


mongoose
  .connect(process.env.MONGO_CONECTION_URI as string)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });


  

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
}));

app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)


  
app.listen(3000, () => {
  console.log(`server running `);
});
