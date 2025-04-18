# Entry Management System - Wireframes

## Login View
```
+------------------------------------------+
|          Entry Management System          |
+------------------------------------------+
|                                          |
|     +------------------------------+      |
|     |        Welcome Back!        |      |
|     +------------------------------+      |
|                                          |
|     +------------------------------+      |
|     | Email                       |      |
|     | [                        ]  |      |
|     +------------------------------+      |
|                                          |
|     +------------------------------+      |
|     | Password                    |      |
|     | [                        ]  |      |
|     +------------------------------+      |
|                                          |
|     +------------------------------+      |
|     |         [ Login ]           |      |
|     +------------------------------+      |
|                                          |
|     Forgot Password? | Register          |
|                                          |
+------------------------------------------+
```

## Super Admin Dashboard
```
+------------------------------------------+
| Logo      Super Admin Dashboard   Profile |
+------------------+---------------------+--+
| Navigation       | Total Locations     |
| ┌──────────┐    | [5]                |
| │Dashboard │    +-------------------+
| ├──────────┤    | Total Users       |
| │Locations│    | [250]              |
| ├──────────┤    +-------------------+
| │Users    │    | Active Cards      |
| ├──────────┤    | [180]             |
| │Reports  │    +-------------------+
| └──────────┘    | Pending Approvals |
|                | [12]               |
|                +-------------------+
|                |                   |
|                | Recent Activity   |
|                | - New location    |
|                | - User updated    |
|                | - Card issued     |
|                |                   |
|                | System Status     |
|                | ● All Systems OK  |
|                | ● Backups: OK     |
|                | ● Network: OK     |
|                |                   |
+----------------+-------------------+
```

## Admin Dashboard
```
+------------------------------------------+
| Logo        Location Admin         Profile|
+------------------+---------------------+--+
| Navigation       | Total Employees    |
| ┌──────────┐    | [150]             |
| │Dashboard │    +-------------------+
| ├──────────┤    | Active Guards     |
| │Employees│    | [8]               |
| ├──────────┤    +-------------------+
| │Guards   │    | Pending Materials |
| ├──────────┤    | [5]               |
| │Materials│    +-------------------+
| └──────────┘    | Today's Entries   |
|                | [45]              |
|                +-------------------+
|                |                   |
|                | Recent Alerts     |
|                | ⚠️ Gate B Alert   |
|                | ℹ️ New Entry      |
|                |                   |
|                | Quick Actions     |
|                | [Manage Employees]|
|                | [Manage Guards]   |
|                | [View Materials]  |
|                |                   |
+----------------+-------------------+
```

## Manager Dashboard
```
+------------------------------------------+
| Logo           Team Manager        Profile|
+------------------+---------------------+--+
| Navigation       | Team Overview      |
| ┌──────────┐    | Present: 22/25     |
| │Dashboard │    +-------------------+
| ├──────────┤    | Team Members      |
| │Team     │    | ● John (Present)  |
| ├──────────┤    | ● Jane (Absent)   |
| │Approvals│    | ● Mike (Leave)    |
| ├──────────┤    +-------------------+
| │Reports  │    | Pending Approvals |
| └──────────┘    | 📦 Lab Equipment  |
|                | 🚶 Medical Leave   |
|                +-------------------+
|                |                   |
|                | Today's Schedule  |
|                | 09:00 Meeting     |
|                | 14:00 Review      |
|                |                   |
|                | Quick Actions     |
|                | [Team Attendance] |
|                | [Approve Requests]|
|                |                   |
+----------------+-------------------+
```

## Guard Dashboard
```
+------------------------------------------+
| Logo            Guard View         Profile|
+------------------+---------------------+--+
| Navigation       | Quick Actions      |
| ┌──────────┐    | +---------------+  |
| │Dashboard │    | |  Scan Entry   |  |
| ├──────────┤    | |   [QR/Card]   |  |
| │Entries  │    | +---------------+  |
| ├──────────┤    | +---------------+  |
| │Materials│    | |Employee Entry |  |
| ├──────────┤    | |   [Manual]    |  |
| │Visitors │    | +---------------+  |
| └──────────┘    | +---------------+  |
|                | |Material Entry |  |
|                | |   [E-Bill]    |  |
|                | +---------------+  |
|                |                   |
|                | Recent Activity   |
|                | 09:15 Entry      |
|                | 09:10 Material   |
|                | 09:00 Exit       |
|                |                   |
|                | Pending          |
|                | - Lab Equipment  |
|                | - Visitor Pass   |
|                |                   |
+----------------+-------------------+
```

## Entry Form
```
+------------------------------------------+
|           New Entry Registration          |
+------------------------------------------+
|                                          |
| Entry Type                               |
| [Employee ▼]                             |
|                                          |
| ID/Card Number                           |
| [                                     ]  |
|                                          |
| Purpose                                  |
| [                                     ]  |
|                                          |
| Entry Point                              |
| [Main Gate ▼]                           |
|                                          |
| Attachments                              |
| [ Upload Documents ]                     |
|                                          |
| Notes                                    |
| [                                     ]  |
| [                                     ]  |
|                                          |
| [Cancel]               [Submit Entry]    |
|                                          |
+------------------------------------------+
```

## Material Entry Form
```
+------------------------------------------+
|           Material Entry Form             |
+------------------------------------------+
|                                          |
| Material Type                            |
| [Equipment ▼]                            |
|                                          |
| Material ID                              |
| [                                     ]  |
|                                          |
| Quantity                                 |
| [        ] [Units ▼]                    |
|                                          |
| E-Bill Scan                              |
| [ Scan Document ]                        |
|                                          |
| Description                              |
| [                                     ]  |
| [                                     ]  |
|                                          |
| Entry Point                              |
| [Material Gate ▼]                       |
|                                          |
| [Cancel]          [Submit for Approval]  |
|                                          |
+------------------------------------------+
```

## User Management
```
+------------------------------------------+
|            User Management                |
+------------------------------------------+
| [+ Add User]        Search [         ]   |
|                                          |
| Filters: [Role ▼] [Status ▼] [Clear]    |
|                                          |
| +------------------------------------+   |
| | Name    Role     Status    Actions |   |
| |------------------------------------|   |
| | John    Admin    Active    [⋮]     |   |
| | Jane    Manager  Active    [⋮]     |   |
| | Mike    Guard    Inactive  [⋮]     |   |
| +------------------------------------+   |
|                                          |
| Showing 1-3 of 250 users                 |
| [< 1 2 3 ... 25 >]                      |
|                                          |
+------------------------------------------+
```

## Reports Dashboard
```
+------------------------------------------+
|              Reports View                 |
+------------------------------------------+
| Report Type                               |
| [Entry Report ▼]                         |
|                                          |
| Date Range                               |
| [Start Date ▼]    [End Date ▼]          |
|                                          |
| Filters                                  |
| [Location ▼] [Type ▼] [Status ▼]        |
|                                          |
| Format                                   |
| (•) PDF  ( ) CSV  ( ) Excel             |
|                                          |
| [Generate Report]                        |
|                                          |
| Recent Reports                           |
| +------------------------------------+   |
| | Date     Type     Format   Action  |   |
| |------------------------------------|   |
| | Mar 15   Entry    PDF      [↓]    |   |
| | Mar 14   Access   CSV      [↓]    |   |
| +------------------------------------+   |
|                                          |
+------------------------------------------+
```

## Mobile Responsive Views

### Mobile Dashboard (Guard)
```
+------------------+
|  ☰  Guard View  👤 |
+------------------+
|   Quick Actions  |
| +-------------+ |
| |  Scan Entry | |
| +-------------+ |
| +-------------+ |
| |Entry Manual | |
| +-------------+ |
| +-------------+ |
| |   Material  | |
| +-------------+ |
|                |
| Recent Activity |
| • Entry: #123   |
| • Exit: #456    |
| • Material: #789 |
|                |
| Pending Items   |
| • Approvals: 2  |
| • Materials: 1  |
|                |
+------------------+
```

### Mobile Entry Form
```
+------------------+
| < New Entry     |
+------------------+
| Type            |
| [Employee    ▼] |
|                |
| ID Number      |
| [           ]  |
|                |
| Purpose        |
| [           ]  |
|                |
| Entry Point    |
| [Main Gate  ▼] |
|                |
| [Take Photo]   |
|                |
| [   Submit   ] |
+------------------+
```

## Component States

### Button States
```
Normal:    [   Button   ]
Hover:     [  >Button<  ]
Active:    [ >>Button<< ]
Disabled:  [   Button   ]
           (greyed out)
```

### Form Field States
```
Normal:    [               ]
Focus:     [█              ]
Error:     [               ]
           ⚠️ Error message
Success:   [               ]
           ✓ Success message
```

### Loading States
```
Button:    [ Loading... ⟳ ]
Page:      +-------------+
           |  ⟳         |
           | Loading... |
           |           |
           +-------------+
```

These wireframes serve as a visual guide for the implementation of the Entry Management System's user interface. They showcase the layout, component placement, and user interaction elements across different views and device sizes. 