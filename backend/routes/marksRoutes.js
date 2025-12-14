import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { upsertMarks, getMarksByStudent, getMarks } from '../controllers/marksController.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', upsertMarks);
router.get('/', getMarks);
router.get('/student/:studentId', getMarksByStudent);

export default router;
