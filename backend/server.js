import express from "express";
import dotenv from "dotenv";
import cookie from "cookie-parser";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import parcelRoutes from "./routes/parcels.js";
import documentRoutes from "./routes/documents.js";
import notificationRoutes from "./routes/notifications.js";
import dashboardRoutes from "./routes/dashboard.js";
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
app.use("/api/parcels", parcelRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Internal server error'});
});

const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server yo on port ${PORT}`);
});
