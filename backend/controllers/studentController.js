import Student from '../models/Student.js';

export const createStudent = async (req, res) => {
  const { name, branch, semester, contact } = req.body;
  if (!name || !branch || !semester || !contact) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const student = await Student.create({ name, branch, semester, contact });
  return res.status(201).json(student);
};

export const getStudents = async (req, res) => {
  const { search } = req.query;
  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { _id: search }
    ];
  }
  const students = await Student.find(query).sort({ createdAt: -1 });
  return res.json(students);
};

export const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  return res.json(student);
};

export const updateStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  const { name, branch, semester, contact } = req.body;
  student.name = name ?? student.name;
  student.branch = branch ?? student.branch;
  student.semester = semester ?? student.semester;
  student.contact = contact ?? student.contact;
  const updated = await student.save();
  return res.json(updated);
};

export const deleteStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  await student.deleteOne();
  return res.json({ message: 'Student removed' });
};
