import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import api from '../api/client.js';

const emptyStudent = { name: '', branch: '', semester: '', contact: '' };

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [current, setCurrent] = useState(emptyStudent);
  const [editingId, setEditingId] = useState(null);

  const loadStudents = async () => {
    const { data } = await api.get('/students', { params: { search: search || undefined } });
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSearch = async () => {
    await loadStudents();
  };

  const openCreate = () => {
    setEditingId(null);
    setCurrent(emptyStudent);
    setDialogOpen(true);
  };

  const openEdit = (student) => {
    setEditingId(student._id);
    setCurrent({ name: student.name, branch: student.branch, semester: student.semester, contact: student.contact });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    await api.delete(`/students/${id}`);
    await loadStudents();
  };

  const handleSave = async () => {
    if (editingId) {
      await api.put(`/students/${editingId}`, current);
    } else {
      await api.post('/students', current);
    }
    setDialogOpen(false);
    await loadStudents();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search by name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
        />
        <Button variant="outlined" onClick={handleSearch}>
          Search
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" onClick={openCreate}>
          Add Student
        </Button>
      </Box>
      {students.length === 0 ? (
        <Typography>No students found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s._id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.branch}</TableCell>
                  <TableCell>{s.semester}</TableCell>
                  <TableCell>{s.contact}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openEdit(s)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(s._id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Student' : 'Add Student'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={current.name}
            onChange={(e) => setCurrent({ ...current, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Branch"
            value={current.branch}
            onChange={(e) => setCurrent({ ...current, branch: e.target.value })}
            fullWidth
          />
          <TextField
            label="Semester"
            value={current.semester}
            onChange={(e) => setCurrent({ ...current, semester: e.target.value })}
            fullWidth
          />
          <TextField
            label="Contact"
            value={current.contact}
            onChange={(e) => setCurrent({ ...current, contact: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentsPage;
