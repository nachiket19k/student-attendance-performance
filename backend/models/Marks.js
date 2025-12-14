import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: String, required: true },
    marks: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

marksSchema.index({ studentId: 1, subject: 1 }, { unique: true });

const Marks = mongoose.model('Marks', marksSchema);

export default Marks;
