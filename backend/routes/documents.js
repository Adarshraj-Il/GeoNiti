import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, (req, res) => {
    res.json([{ id: 1, name: 'Sample Document.pdf', type: 'application/pdf' }]);
});

export default router;