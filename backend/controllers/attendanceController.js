import Attendance from '../models/Attendance.js';

export const markAttendance = async (req, res) => {
  const { studentId, date, status } = req.body;
  if (!studentId || !date || !status) {
    return res.status(400).json({ message: 'studentId, date and status are required' });
  }
  const isoDate = new Date(date);
  try {
    const record = await Attendance.findOneAndUpdate(
      { studentId, date: isoDate },
      { studentId, date: isoDate, status },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return res.status(201).json(record);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAttendanceByDate = async (req, res) => {
  const { date } = req.query;
  const query = {};
  if (date) {
    const day = new Date(date);
    const next = new Date(day);
    next.setDate(day.getDate() + 1);
    query.date = { $gte: day, $lt: next };
  }
  const records = await Attendance.find(query).populate('studentId');
  return res.json(records);
};

export const getAttendanceByStudent = async (req, res) => {
  const { studentId } = req.params;
  const records = await Attendance.find({ studentId }).sort({ date: 1 });
  return res.json(records);
};

export const getAttendanceSummary = async (req, res) => {
  const { studentId } = req.params;
  const total = await Attendance.countDocuments({ studentId });
  const present = await Attendance.countDocuments({ studentId, status: 'Present' });
  const percentage = total === 0 ? 0 : Math.round((present / total) * 100);
  return res.json({ total, present, percentage });
};
