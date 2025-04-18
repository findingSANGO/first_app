import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import HistoryIcon from '@mui/icons-material/History';

export const GuardMenu: React.FC = () => {
    return (
        <List>
            <ListItem button component={Link} to="/guard-dashboard">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Guard Dashboard" />
            </ListItem>

            <Divider />

            <ListItem button component={Link} to="/scan-entry">
                <ListItemIcon>
                    <QrCodeScannerIcon />
                </ListItemIcon>
                <ListItemText primary="Scan Entry" />
            </ListItem>

            <ListItem button component={Link} to="/employee-entry">
                <ListItemIcon>
                    <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Employee Entry" />
            </ListItem>

            <ListItem button component={Link} to="/material-entry">
                <ListItemIcon>
                    <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Material Entry" />
            </ListItem>

            <Divider />

            <ListItem button component={Link} to="/verify-outpass">
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Verify OutPass" />
            </ListItem>

            <ListItem button component={Link} to="/recent-entries">
                <ListItemIcon>
                    <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Recent Entries" />
            </ListItem>
        </List>
    );
}; 