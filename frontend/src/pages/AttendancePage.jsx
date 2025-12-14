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

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [records, setRecords] = useState({});

  const loadStudents = async () => {
    const { data } = await api.get('/students');
    setStudents(data);
  };

  const loadAttendance = async () => {
    const { data } = await api.get('/attendance', { params: { date } });
    const byStudent = {};
    data.forEach((r) => {
      byStudent[r.studentId._id] = r.status;
    });
    setRecords(byStudent);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    loadAttendance();
  }, [date]);

  const handleStatusChange = (studentId, status) => {
    setRecords((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSave = async () => {
    const promises = students.map((s) => {
      const status = records[s._id] || 'Absent';
      return api.post('/attendance', { studentId: s._id, date, status });
    });
    await Promise.all(promises);
    await loadAttendance();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" onClick={handleSave}>
          Save Attendance
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s._id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.branch}</TableCell>
                <TableCell>{s.semester}</TableCell>
                <TableCell>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      label="Status"
                      value={records[s._id] || ''}
                      onChange={(e) => handleStatusChange(s._id, e.target.value)}
                    >
                      <MenuItem value="Present">Present</MenuItem>
                      <MenuItem value="Absent">Absent</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AttendancePage;
