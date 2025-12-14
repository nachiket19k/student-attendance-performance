import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  markAttendance,
  getAttendanceByDate,
  getAttendanceByStudent,
  getAttendanceSummary
} from '../controllers/attendanceController.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', markAttendance);
router.get('/', getAttendanceByDate);
router.get('/student/:studentId', getAttendanceByStudent);
router.get('/student/:studentId/summary', getAttendanceSummary);

export default router;
