import express from 'express';
import pool from '../config/auth_db.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT COUNT(*) as project_count FROM projects');
        res.json({ project_count: parseInt(rows[0].project_count, 10) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;