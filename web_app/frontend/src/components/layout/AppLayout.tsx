import React from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, IconButton, List } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import { SuperAdminMenu } from './menus/SuperAdminMenu';
import { AdminMenu } from './menus/AdminMenu';
import { ManagerMenu } from './menus/ManagerMenu';
import { GuardMenu } from './menus/GuardMenu';

const drawerWidth = 240;

export const AppLayout: React.FC = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { user } = useAuthStore();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const getMenuComponent = () => {
        switch (user?.role) {
            case 'super_admin':
                return <SuperAdminMenu />;
            case 'admin':
                return <AdminMenu />;
            case 'manager':
                return <ManagerMenu />;
            case 'guard':
                return <GuardMenu />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Gate Management System
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {getMenuComponent()}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {getMenuComponent()}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}; 