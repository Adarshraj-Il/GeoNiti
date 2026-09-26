import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import pool from '../config/auth_db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
    try {
        const schemaPath = path.join(__dirname, '../db/schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        console.log("Executing schema...");
        await pool.query(schema);

        console.log("Inserting Roles...");
        const roles = [
            'Land Owner',
            'Project Implementing Agency',
            'District Officer',
            'State Officer',
            'Compensation Officer',
            'Field Officer',
            'Administrator'
        ];

        for (const role of roles) {
            await pool.query(
                `INSERT INTO roles (role_name) VALUES ($1) ON CONFLICT (role_name) DO NOTHING`,
                [role]
            );
        }

        console.log("Inserting States and Districts...");
        await pool.query(`INSERT INTO states (state_name) VALUES ('Maharashtra') ON CONFLICT (state_name) DO NOTHING`);
        const stateRes = await pool.query(`SELECT id FROM states WHERE state_name = 'Maharashtra'`);
        const stateId = stateRes.rows[0].id;

        await pool.query(`INSERT INTO districts (district_name, state_id) VALUES ('Pune', $1), ('Mumbai', $1) ON CONFLICT DO NOTHING`, [stateId]);
        const distRes = await pool.query(`SELECT id FROM districts WHERE district_name = 'Pune'`);
        const distId = distRes.rows[0].id;

        console.log("Creating Admin User...");
        const adminEmail = 'admin@geoniti.gov.in';
        const hashedPw = await bcrypt.hash('admin123', 10);
        
        const adminCheck = await pool.query(`SELECT id FROM users WHERE email = $1`, [adminEmail]);
        let adminId;
        if (adminCheck.rows.length === 0) {
            const adminRes = await pool.query(
                `INSERT INTO users (name, email, password_hash, state_id, district_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                ['Super Admin', adminEmail, hashedPw, stateId, distId]
            );
            adminId = adminRes.rows[0].id;
            const roleRes = await pool.query(`SELECT id FROM roles WHERE role_name = 'Administrator'`);
            await pool.query(`INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)`, [adminId, roleRes.rows[0].id]);
        }
        
        console.log("Creating Test Project Agency User...");
        const agencyEmail = 'agency@geoniti.gov.in';
        const agencyCheck = await pool.query(`SELECT id FROM users WHERE email = $1`, [agencyEmail]);
        if (agencyCheck.rows.length === 0) {
            const agencyRes = await pool.query(
                `INSERT INTO users (name, email, password_hash, state_id, district_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                ['NHAI Project Agency', agencyEmail, hashedPw, stateId, distId]
            );
            const agencyId = agencyRes.rows[0].id;
            const roleRes = await pool.query(`SELECT id FROM roles WHERE role_name = 'Project Implementing Agency'`);
            await pool.query(`INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)`, [agencyId, roleRes.rows[0].id]);
            
            console.log("Creating Sample Project...");
            await pool.query(
                `INSERT INTO projects (title, description, agency_id, state_id, district_id, status) VALUES ($1, $2, $3, $4, $5, $6)`,
                ['Pune-Mumbai Expressway Expansion', 'Expanding expressway for better traffic management.', agencyId, stateId, distId, 'Draft']
            );
        }

        console.log("Database seeded successfully.");
    } catch (err) {
        console.error("Error seeding DB:", err);
    } finally {
        pool.end();
    }
}

seed();
