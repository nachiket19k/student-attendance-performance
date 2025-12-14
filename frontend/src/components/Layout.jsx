import React from 'react';
import { AppBar, Box, Button, CssBaseline, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Layout = ({ children }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            Student Attendance & Performance Manager
          </Typography>
          {admin && (
            <>
              <Button color="inherit" component={RouterLink} to="/students">
                Students
              </Button>
              <Button color="inherit" component={RouterLink} to="/attendance">
                Attendance
              </Button>
              <Button color="inherit" component={RouterLink} to="/marks">
                Marks
              </Button>
              <Button color="inherit" component={RouterLink} to="/reports">
                Reports
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
