import express from "express";
import dotenv from "dotenv";
import cookie from "cookie-parser";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import cors from "cors";
const app=express();
dotenv.config();
app.use(express.json());
app.use(cookie());

app.use(cors({
    origin : process.env.CLIENT_URL || "http://localhost:5173",
    credentials : true,
}))
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/",(req,res)=>{
    res.send("hello world");
});
const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server yo on port ${PORT}`);
});
