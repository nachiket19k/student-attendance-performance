import Marks from '../models/Marks.js';

export const upsertMarks = async (req, res) => {
  const { studentId, subject, marks } = req.body;
  if (!studentId || !subject || marks === undefined) {
    return res.status(400).json({ message: 'studentId, subject and marks are required' });
  }
  try {
    const record = await Marks.findOneAndUpdate(
      { studentId, subject },
      { studentId, subject, marks },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return res.status(201).json(record);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getMarksByStudent = async (req, res) => {
  const { studentId } = req.params;
  const records = await Marks.find({ studentId }).sort({ subject: 1 });
  return res.json(records);
};

export const getMarks = async (req, res) => {
  const { studentId } = req.query;
  const query = {};
  if (studentId) query.studentId = studentId;
  const records = await Marks.find(query).populate('studentId');
  return res.json(records);
};
