import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import api from '../api/client.js';

const StatCard = ({ label, value }) => (
  <Card>
    <CardContent>
      <Typography variant="subtitle2" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="h5">{value}</Typography>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const [stats, setStats] = useState({ totalStudents: 0, totalAttendanceRecords: 0, totalMarksRecords: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/reports/overview');
        setStats(data);
      } catch (err) {
        // fail silently on dashboard
      }
    };
    fetchStats();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <StatCard label="Total Students" value={stats.totalStudents} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard label="Attendance Records" value={stats.totalAttendanceRecords} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard label="Marks Records" value={stats.totalMarksRecords} />
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
