import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(createStudent).get(getStudents);
router.route('/:id').get(getStudentById).put(updateStudent).delete(deleteStudent);

export default router;
