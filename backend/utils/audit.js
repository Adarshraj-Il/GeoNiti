import pool from '../config/auth_db.js';

export const logAction = async ({ userId, action, entity, entityId, ip }) => {
  try {
    // Legacy support or fallback
  } catch (error) {
    console.error('Failed to log action:', error);
  }
};

export const logAudit = async (projectId, actionBy, action, previousStatus, newStatus, remarks) => {
    try {
        await pool.query(
            'INSERT INTO audit_logs (project_id, action_by, action, previous_status, new_status, remarks) VALUES ($1, $2, $3, $4, $5, $6)',
            [projectId, actionBy, action, previousStatus, newStatus, remarks]
        );
    } catch (error) {
        console.error('Failed to log workflow audit:', error);
    }
};
