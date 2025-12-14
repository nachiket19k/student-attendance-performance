import Attendance from '../models/Attendance.js';
import Marks from '../models/Marks.js';
import Student from '../models/Student.js';

export const getAttendanceReport = async (req, res) => {
  const pipeline = [
    {
      $group: {
        _id: '$studentId',
        total: { $sum: 1 },
        present: {
          $sum: {
            $cond: [{ $eq: ['$status', 'Present'] }, 1, 0]
          }
        }
      }
    },
    {
      $lookup: {
        from: 'students',
        localField: '_id',
        foreignField: '_id',
        as: 'student'
      }
    },
    { $unwind: '$student' },
    {
      $project: {
        _id: 0,
        studentId: '$student._id',
        name: '$student.name',
        branch: '$student.branch',
        semester: '$student.semester',
        total: 1,
        present: 1,
        percentage: {
          $cond: [
            { $eq: ['$total', 0] },
            0,
            { $round: [{ $multiply: [{ $divide: ['$present', '$total'] }, 100] }, 0] }
          ]
        }
      }
    }
  ];

  const result = await Attendance.aggregate(pipeline);
  const lowAttendance = result.filter((r) => r.percentage < 75);

  return res.json({ summary: result, lowAttendance });
};

export const getMarksReport = async (req, res) => {
  const pipeline = [
    {
      $group: {
        _id: '$studentId',
        avgMarks: { $avg: '$marks' },
        totalMarks: { $sum: '$marks' }
      }
    },
    {
      $lookup: {
        from: 'students',
        localField: '_id',
        foreignField: '_id',
        as: 'student'
      }
    },
    { $unwind: '$student' },
    {
      $project: {
        _id: 0,
        studentId: '$student._id',
        name: '$student.name',
        branch: '$student.branch',
        semester: '$student.semester',
        avgMarks: 1,
        totalMarks: 1
      }
    },
    { $sort: { avgMarks: -1 } }
  ];

  const result = await Marks.aggregate(pipeline);
  const topPerformers = result.slice(0, 5);

  return res.json({ summary: result, topPerformers });
};

export const getOverviewStats = async (req, res) => {
  const totalStudents = await Student.countDocuments();
  const totalAttendanceRecords = await Attendance.countDocuments();
  const totalMarksRecords = await Marks.countDocuments();

  return res.json({ totalStudents, totalAttendanceRecords, totalMarksRecords });
};
