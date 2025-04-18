import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';

interface DashboardStatProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

const DashboardStat: React.FC<DashboardStatProps> = ({ title, value, icon, color }) => (
    <Card>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ color, mr: 1 }}>{icon}</Box>
                <Typography variant="h6">{title}</Typography>
            </Box>
            <Typography variant="h4">{value}</Typography>
        </CardContent>
    </Card>
);

interface AlertItem {
    id: number;
    type: string;
    message: string;
    time: string;
}

export const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();

    // TODO: Replace with actual API calls
    const stats = {
        totalEmployees: 150,
        activeGuards: 8,
        pendingMaterials: 5,
        todayEntries: 45,
    };

    // Mock alerts data
    const alerts: AlertItem[] = [
        {
            id: 1,
            type: 'warning',
            message: 'Multiple failed access attempts at Gate B',
            time: '10 minutes ago',
        },
        {
            id: 2,
            type: 'info',
            message: 'New material entry request pending approval',
            time: '30 minutes ago',
        },
        // Add more alerts as needed
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Location Admin Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Statistics */}
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardStat
                        title="Total Employees"
                        value={stats.totalEmployees}
                        icon={<PeopleIcon fontSize="large" />}
                        color="#1976d2"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardStat
                        title="Active Guards"
                        value={stats.activeGuards}
                        icon={<SecurityIcon fontSize="large" />}
                        color="#2e7d32"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardStat
                        title="Pending Materials"
                        value={stats.pendingMaterials}
                        icon={<LocalShippingIcon fontSize="large" />}
                        color="#ed6c02"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardStat
                        title="Today's Entries"
                        value={stats.todayEntries}
                        icon={<AccessTimeIcon fontSize="large" />}
                        color="#9c27b0"
                    />
                </Grid>

                {/* Alerts and Notifications */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Alerts
                        </Typography>
                        <List>
                            {alerts.map((alert) => (
                                <React.Fragment key={alert.id}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <WarningIcon color="warning" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={alert.message}
                                            secondary={alert.time}
                                        />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Quick Actions */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Quick Actions
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<PeopleIcon />}
                                    onClick={() => navigate('/employees')}
                                >
                                    Manage Employees
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<SecurityIcon />}
                                    onClick={() => navigate('/guards')}
                                >
                                    Manage Guards
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<LocalShippingIcon />}
                                    onClick={() => navigate('/material-entries')}
                                >
                                    View Material Entries
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Recent Activity Log */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Activity Log
                        </Typography>
                        <Box sx={{ height: 200, overflowY: 'auto' }}>
                            {/* TODO: Add activity log component */}
                            <Typography color="text.secondary">Loading activity log...</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}; 