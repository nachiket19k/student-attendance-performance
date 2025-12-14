import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  getAttendanceReport,
  getMarksReport,
  getOverviewStats
} from '../controllers/reportController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/attendance', getAttendanceReport);
router.get('/marks', getMarksReport);
router.get('/overview', getOverviewStats);

export default router;
