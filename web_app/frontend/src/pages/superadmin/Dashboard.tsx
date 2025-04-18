import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
    CardActions,
    Button,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
    <Card>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ color, mr: 1 }}>{icon}</Box>
                <Typography variant="h6">{title}</Typography>
            </Box>
            <Typography variant="h4">{value}</Typography>
        </CardContent>
    </Card>
);

export const SuperAdminDashboard: React.FC = () => {
    const navigate = useNavigate();

    // TODO: Replace with actual API calls
    const stats = {
        totalLocations: 5,
        totalUsers: 250,
        activeCards: 180,
        pendingApprovals: 12,
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Super Admin Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Statistics Cards */}
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Locations"
                        value={stats.totalLocations}
                        icon={<LocationOnIcon fontSize="large" />}
                        color="#1976d2"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon={<PeopleIcon fontSize="large" />}
                        color="#2e7d32"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Active Cards"
                        value={stats.activeCards}
                        icon={<SecurityIcon fontSize="large" />}
                        color="#ed6c02"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Pending Approvals"
                        value={stats.pendingApprovals}
                        icon={<AssessmentIcon fontSize="large" />}
                        color="#9c27b0"
                    />
                </Grid>

                {/* Recent Activity */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Activity
                        </Typography>
                        <Box sx={{ height: 300, overflowY: 'auto' }}>
                            {/* TODO: Add activity list component */}
                            <Typography color="text.secondary">Loading activities...</Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* System Status */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            System Status
                        </Typography>
                        <Box sx={{ height: 300, overflowY: 'auto' }}>
                            {/* TODO: Add system status component */}
                            <Typography color="text.secondary">Loading system status...</Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Quick Actions */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Quick Actions
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    startIcon={<LocationOnIcon />}
                                    onClick={() => navigate('/locations')}
                                >
                                    Manage Locations
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    startIcon={<PeopleIcon />}
                                    onClick={() => navigate('/users')}
                                >
                                    Manage Users
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    startIcon={<SecurityIcon />}
                                    onClick={() => navigate('/access-control')}
                                >
                                    Access Control
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}; 