import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useNavigate } from 'react-router-dom';

export const GuardDashboard: React.FC = () => {
    const navigate = useNavigate();

    const QuickActionCard: React.FC<{
        title: string;
        description: string;
        icon: React.ReactNode;
        action: () => void;
    }> = ({ title, description, icon, action }) => (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {icon}
                    <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                        {title}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={action}>
                    Open
                </Button>
            </CardActions>
        </Card>
    );

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Guard Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Quick Actions */}
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Quick Actions
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <QuickActionCard
                        title="Scan Entry"
                        description="Scan employee access card or QR code for quick entry"
                        icon={<QrCodeScannerIcon fontSize="large" color="primary" />}
                        action={() => navigate('/scan-entry')}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <QuickActionCard
                        title="Employee Entry"
                        description="Manual entry for employees and visitors"
                        icon={<PersonAddIcon fontSize="large" color="primary" />}
                        action={() => navigate('/employee-entry')}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <QuickActionCard
                        title="Material Entry"
                        description="Process material entry with e-bill scanning"
                        icon={<LocalShippingIcon fontSize="large" color="primary" />}
                        action={() => navigate('/material-entry')}
                    />
                </Grid>

                {/* Recent Activity */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Activity
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Loading recent entries...
                        </Typography>
                    </Paper>
                </Grid>

                {/* Pending Approvals */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Pending Approvals
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Loading pending approvals...
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}; 