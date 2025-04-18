import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export const ManagerMenu: React.FC = () => {
    return (
        <List>
            <ListItem button component={Link} to="/dashboard">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button component={Link} to="/my-team">
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="My Team" />
            </ListItem>

            <Divider />

            <ListItem button component={Link} to="/material-approvals">
                <ListItemIcon>
                    <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Material Approvals" />
            </ListItem>

            <ListItem button component={Link} to="/outpass-requests">
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="OutPass Requests" />
            </ListItem>

            <Divider />

            <ListItem button component={Link} to="/entry-logs">
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Entry Logs" />
            </ListItem>
        </List>
    );
}; 