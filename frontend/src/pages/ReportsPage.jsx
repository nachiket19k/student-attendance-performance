import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '../api/client.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportsPage = () => {
  const [attendanceReport, setAttendanceReport] = useState({ summary: [], lowAttendance: [] });
  const [marksReport, setMarksReport] = useState({ summary: [], topPerformers: [] });

  useEffect(() => {
    const fetchReports = async () => {
      const [attRes, marksRes] = await Promise.all([
        api.get('/reports/attendance'),
        api.get('/reports/marks')
      ]);
      setAttendanceReport(attRes.data);
      setMarksReport(marksRes.data);
    };
    fetchReports();
  }, []);

  const attendanceChartData = {
    labels: attendanceReport.summary.map((r) => r.name),
    datasets: [
      {
        label: 'Attendance %',
        data: attendanceReport.summary.map((r) => r.percentage),
        backgroundColor: 'rgba(25, 118, 210, 0.6)'
      }
    ]
  };

  const marksChartData = {
    labels: marksReport.summary.map((r) => r.name),
    datasets: [
      {
        label: 'Average Marks',
        data: marksReport.summary.map((r) => r.avgMarks),
        backgroundColor: 'rgba(56, 142, 60, 0.6)'
      }
    ]
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Attendance Percentage per Student
          </Typography>
          {attendanceReport.summary.length === 0 ? (
            <Typography variant="body2">No attendance data.</Typography>
          ) : (
            <Bar data={attendanceChartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Average Marks per Student
          </Typography>
          {marksReport.summary.length === 0 ? (
            <Typography variant="body2">No marks data.</Typography>
          ) : (
            <Bar data={marksChartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Students with &lt; 75% Attendance
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Percentage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceReport.lowAttendance.map((r) => (
                  <TableRow key={r.studentId}>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Top Performers
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Average Marks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marksReport.topPerformers.map((r) => (
                  <TableRow key={r.studentId}>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.avgMarks.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReportsPage;
