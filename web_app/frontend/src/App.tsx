import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useAuthStore from './stores/authStore';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { SuperAdminDashboard } from './pages/superadmin/Dashboard';
import { AdminDashboard } from './pages/admin/Dashboard';
import { ManagerDashboard } from './pages/manager/Dashboard';
import { GuardDashboard } from './pages/guard/Dashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const RoleBasedDashboard: React.FC = () => {
  const { user } = useAuthStore();

  switch (user?.role) {
    case 'super_admin':
      return <SuperAdminDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'manager':
      return <ManagerDashboard />;
    case 'guard':
      return <GuardDashboard />;
    default:
      return <Navigate to="/login" />;
  }
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<RoleBasedDashboard />} />
            
            {/* Super Admin Routes */}
            <Route path="locations/*" element={<div>Locations</div>} />
            <Route path="users/*" element={<div>Users</div>} />
            <Route path="access-control/*" element={<div>Access Control</div>} />
            
            {/* Admin Routes */}
            <Route path="employees/*" element={<div>Employees</div>} />
            <Route path="guards/*" element={<div>Guards</div>} />
            <Route path="access-cards/*" element={<div>Access Cards</div>} />
            
            {/* Manager Routes */}
            <Route path="my-team/*" element={<div>My Team</div>} />
            <Route path="material-approvals/*" element={<div>Material Approvals</div>} />
            <Route path="outpass-requests/*" element={<div>OutPass Requests</div>} />
            
            {/* Guard Routes */}
            <Route path="scan-entry" element={<div>Scan Entry</div>} />
            <Route path="employee-entry" element={<div>Employee Entry</div>} />
            <Route path="material-entry" element={<div>Material Entry</div>} />
            <Route path="verify-outpass" element={<div>Verify OutPass</div>} />
            <Route path="recent-entries" element={<div>Recent Entries</div>} />
            
            {/* Common Routes */}
            <Route path="entry-logs/*" element={<div>Entry Logs</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App; 