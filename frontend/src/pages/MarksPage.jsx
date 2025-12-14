import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField
} from '@mui/material';
import api from '../api/client.js';

const MarksPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [studentMarks, setStudentMarks] = useState([]);

  const loadStudents = async () => {
    const { data } = await api.get('/students');
    setStudents(data);
  };

  const loadMarks = async (studentId) => {
    if (!studentId) {
      setStudentMarks([]);
      return;
    }
    const { data } = await api.get(`/marks/student/${studentId}`);
    setStudentMarks(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    loadMarks(selectedStudentId);
  }, [selectedStudentId]);

  const handleSave = async () => {
    if (!selectedStudentId || !subject) return;
    await api.post('/marks', { studentId: selectedStudentId, subject, marks: Number(marks) });
    setSubject('');
    setMarks('');
    await loadMarks(selectedStudentId);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl sx={{ minWidth: 240 }} size="small">
          <InputLabel>Student</InputLabel>
          <Select
            label="Student"
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
          >
            {students.map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.name} ({s.semester})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Subject"
          size="small"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          label="Marks"
          size="small"
          type="number"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentMarks.map((m) => (
              <TableRow key={m._id}>
                <TableCell>{m.subject}</TableCell>
                <TableCell>{m.marks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MarksPage;
