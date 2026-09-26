import jwt from "jsonwebtoken";
import pool from "../config/auth_db.js";
import dotenv from "dotenv";
dotenv.config();
export const protect= async(req,res,next)=>{
    let token = req.cookies.token;
    
    if (!token && req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    try{
        if (!token){
            return res.status(401).json({message:'Not authorized,no token'});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        console.error(error);
        return res.status(401).json({message:'Not authorized, token failed'});
    }
}