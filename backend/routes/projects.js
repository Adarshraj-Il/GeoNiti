import express from 'express';
import pool from '../config/auth_db.js';
import { protect } from '../middleware/auth.js';
import { logAudit } from '../utils/audit.js';

const router = express.Router();

// Get projects based on role
router.get('/', protect, async (req, res) => {
    try {
        const { id, roles, state, district } = req.user;
        let query = '';
        let params = [];

        if (roles.includes('Administrator') || roles.includes('State Officer')) {
            query = 'SELECT p.*, a.name as agency_name, s.state_name, d.district_name FROM projects p JOIN users a ON p.agency_id = a.id LEFT JOIN states s ON p.state_id = s.id LEFT JOIN districts d ON p.district_id = d.id';
        } else if (roles.includes('Project Implementing Agency')) {
            query = 'SELECT p.*, s.state_name, d.district_name FROM projects p LEFT JOIN states s ON p.state_id = s.id LEFT JOIN districts d ON p.district_id = d.id WHERE p.agency_id = $1';
            params = [id];
        } else if (roles.includes('District Officer')) {
            // Need to join by district
            query = 'SELECT p.*, a.name as agency_name, s.state_name, d.district_name FROM projects p JOIN users a ON p.agency_id = a.id LEFT JOIN states s ON p.state_id = s.id LEFT JOIN districts d ON p.district_id = d.id WHERE d.district_name = $1 AND p.status != $2';
            params = [district, 'Draft']; // DO shouldn't see drafts
        } else {
            // Fallback for others
            query = 'SELECT p.*, a.name as agency_name, s.state_name, d.district_name FROM projects p JOIN users a ON p.agency_id = a.id LEFT JOIN states s ON p.state_id = s.id LEFT JOIN districts d ON p.district_id = d.id WHERE p.status != $1';
            params = ['Draft'];
        }

        const { rows } = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create project
router.post('/', protect, async (req, res) => {
    try {
        const { title, description, state_id, district_id } = req.body;
        const { id, roles } = req.user;
        
        if (!roles.includes('Project Implementing Agency')) {
            return res.status(403).json({ message: 'Only Project Agency can create projects' });
        }

        const newProject = await pool.query(
            'INSERT INTO projects (title, description, agency_id, state_id, district_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, description, id, state_id, district_id, 'Draft']
        );

        await logAudit(newProject.rows[0].id, id, 'Created Project', null, 'Draft', 'Initial Creation');

        res.status(201).json(newProject.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Workflow engine: advance state
router.post('/:id/advance', protect, async (req, res) => {
    const { id } = req.params;
    const { action, remarks } = req.body; // action can be 'Submit', 'Approve', 'Reject'
    const user = req.user;
    
    try {
        const { rows } = await pool.query('SELECT status FROM projects WHERE id = $1', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Project not found' });
        
        const currentStatus = rows[0].status;
        let newStatus = currentStatus;

        // State Machine Logic
        if (currentStatus === 'Draft' && user.roles.includes('Project Implementing Agency') && action === 'Submit') {
            newStatus = 'Submitted';
        } 
        else if (currentStatus === 'Submitted' && user.roles.includes('District Officer') && action === 'Approve') {
            newStatus = 'District Approved';
        }
        else if (currentStatus === 'District Approved' && user.roles.includes('State Officer') && action === 'Approve') {
            newStatus = 'State Approved';
        }
        else if (currentStatus === 'State Approved' && user.roles.includes('State Officer') && action === 'Issue Notification') {
            newStatus = 'Notification Issued';
        }
        else if (currentStatus === 'Notification Issued' && user.roles.includes('Field Officer') && action === 'Verify') {
            newStatus = 'Field Verified';
        }
        else if (currentStatus === 'Field Verified' && user.roles.includes('Compensation Officer') && action === 'Approve Compensation') {
            newStatus = 'Compensation Pending'; // Actually, after verify it goes to pending, then Officer approves
        }
        else if (currentStatus === 'Compensation Pending' && user.roles.includes('Compensation Officer') && action === 'Pay') {
            newStatus = 'Compensation Paid';
        }
        else if (currentStatus === 'Compensation Paid' && user.roles.includes('Administrator') && action === 'Complete') {
            newStatus = 'Completed';
        } else {
            return res.status(400).json({ message: 'Invalid transition or unauthorized for this action' });
        }

        // Update Project
        await pool.query('UPDATE projects SET status = $1, updated_at = NOW() WHERE id = $2', [newStatus, id]);
        
        // Audit log
        await logAudit(id, user.id, action, currentStatus, newStatus, remarks || '');

        // Notification
        await pool.query(
            'INSERT INTO notifications (user_id, message) VALUES ($1, $2)',
            [user.id, `Project ID ${id} transitioned from ${currentStatus} to ${newStatus}`]
        );

        res.json({ message: 'Success', status: newStatus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Audit History
router.get('/:id/history', protect, async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT a.*, u.name as action_by_name FROM audit_logs a JOIN users u ON a.action_by = u.id WHERE project_id = $1 ORDER BY created_at DESC',
            [req.params.id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
