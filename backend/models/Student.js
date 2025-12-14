import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    branch: { type: String, required: true },
    semester: { type: String, required: true },
    contact: { type: String, required: true }
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
