import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/auth_db.js';
import {protect} from '../middleware/auth.js';

const router =express.Router();
const cookieOption ={
    httpOnly:true,
    secure:process.env.Node_ENV === 'production',
    sameSite:"strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
}
const generateToken=(payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"8h"});
}
router.post('/register', async(req,res)=>{
    const {name,email,password, roleId} =req.body;
    if(!name || !email || !password){
        return res.status(400).json({message: 'please provide all required fields'});
    }
    const userExists =await pool.query('SELECT * FROM users WHERE email =$1',[email]);
    if(userExists.rows.length>0){
        return res.status(400).json({message: 'user already exists'});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser =await pool.query(
        'INSERT INTO users (name,email,password_hash) VALUES ($1,$2,$3) RETURNING id,name,email',
        [name,email,hashedPassword]
    );
    const userId = newUser.rows[0].id;
    
    let roles = [];
    let permissions = [];
    
    if (roleId) {
        await pool.query('INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)', [userId, roleId]);
        const roleRes = await pool.query('SELECT role_name FROM roles WHERE id = $1', [roleId]);
        if (roleRes.rows.length > 0) {
            roles.push(roleRes.rows[0].role_name);
            const permRes = await pool.query(
                `SELECT DISTINCT p.permission_name FROM permissions p
                 JOIN role_permissions rp ON rp.permission_id = p.id
                 WHERE rp.role_id = $1`,
                [roleId]
            );
            permissions = permRes.rows.map(p => p.permission_name);
        }
    }

    const payload = {
        id: userId,
        name: newUser.rows[0].name,
        email: newUser.rows[0].email,
        roles: roles,
        permissions: permissions,
        state: null,
        district: null,
    };

    const token = generateToken(payload);
    res.cookie('token',token,cookieOption);
    return res.status(201).json({ user: payload });
})
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    if (!email || !password){
        return res.status(400).json({message:'please provide all required fields'});
    }
    const { rows } = await pool.query(
        `SELECT u.id, u.name, u.email, u.password_hash,
                u.state_id, u.district_id,
                s.state_name, d.district_name
         FROM users u
         LEFT JOIN states s ON s.id = u.state_id
         LEFT JOIN districts d ON d.id = u.district_id
         WHERE u.email = $1`,
        [email]
    );
    const userData = rows[0];
    if(!userData){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const isMatch =await bcrypt.compare(password,userData.password_hash);
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }

    // Get this user's roles
    const { rows: roles } = await pool.query(
        `SELECT r.id, r.role_name FROM roles r
         JOIN user_roles ur ON ur.role_id = r.id
         WHERE ur.user_id = $1`,
        [userData.id]
    );

    // Get all permissions across those roles (deduped)
    let permissions = [];
    if (roles.length > 0) {
        const { rows: perms } = await pool.query(
            `SELECT DISTINCT p.permission_name FROM permissions p
             JOIN role_permissions rp ON rp.permission_id = p.id
             WHERE rp.role_id = ANY($1::int[])`,
            [roles.map(r => r.id)]
        );
        permissions = perms.map(p => p.permission_name);
    }

    const payload = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        roles: roles.map(r => r.role_name),
        permissions: permissions,
        state: userData.state_name,
        district: userData.district_name,
    };

    const token = generateToken(payload);
    res.cookie('token', token, cookieOption);
    
    // Attempt to update last_login if column exists
    try {
        await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [userData.id]);
    } catch (e) {
        // ignore
    }

    return res.status(200).json({ token, user: payload });
})
router.get('/me',protect,async(req,res)=>{
    res.json(req.user)
})
router.post('/logout',(req,res)=>{
    res.cookie('token','',{
        ...cookieOption,
        maxAge:1,
    });
    res.json({message:'Logout successfully'});
})

router.get('/roles', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT id, role_name FROM roles');
        res.json(rows);
    } catch (e) {
        res.status(500).json({message: 'Failed to fetch roles'});
    }
})

export default router;