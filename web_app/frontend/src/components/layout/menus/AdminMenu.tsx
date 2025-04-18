import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BadgeIcon from '@mui/icons-material/Badge';

export const AdminMenu: React.FC = () => {
    return (
        <List>
            <ListItem button component={Link} to="/dashboard">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button component={Link} to="/employees">
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Employee Management" />
            </ListItem>

            <Divider />

            <ListItem button component={Link} to="/entry-logs">
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Entry Logs" />
            </ListItem>

            <ListItem button component={Link} to="/material-entries">
                <ListItemIcon>
                    <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Material Entries" />
            </ListItem>

            <ListItem button component={Link} to="/access-cards">
                <ListItemIcon>
                    <BadgeIcon />
                </ListItemIcon>
                <ListItemText primary="Access Cards" />
            </ListItem>

            <Divider />

            <ListItem button component={Link} to="/guards">
                <ListItemIcon>
                    <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Guard Management" />
            </ListItem>
        </List>
    );
}; 