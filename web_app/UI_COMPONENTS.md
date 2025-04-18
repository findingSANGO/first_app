# Entry Management System - UI Components Documentation

## Design System

### Colors
```scss
// Primary Colors
$primary-main: #1976d2;
$primary-light: #42a5f5;
$primary-dark: #1565c0;

// Secondary Colors
$secondary-main: #9c27b0;
$secondary-light: #ba68c8;
$secondary-dark: #7b1fa2;

// Status Colors
$success: #2e7d32;
$warning: #ed6c02;
$error: #d32f2f;
$info: #0288d1;

// Neutral Colors
$grey-50: #fafafa;
$grey-100: #f5f5f5;
$grey-200: #eeeeee;
$grey-300: #e0e0e0;
$grey-400: #bdbdbd;
$grey-500: #9e9e9e;
$grey-600: #757575;
$grey-700: #616161;
$grey-800: #424242;
$grey-900: #212121;
```

### Typography
```scss
// Font Families
$font-primary: 'Roboto', sans-serif;
$font-secondary: 'Roboto Condensed', sans-serif;
$font-monospace: 'Roboto Mono', monospace;

// Font Sizes
$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-md: 1rem;       // 16px
$font-size-lg: 1.125rem;   // 18px
$font-size-xl: 1.25rem;    // 20px
$font-size-2xl: 1.5rem;    // 24px
$font-size-3xl: 1.875rem;  // 30px
$font-size-4xl: 2.25rem;   // 36px
```

## Common Components

### 1. DataTable
```tsx
interface Column<T> {
  field: keyof T;
  headerName: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  renderCell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
  selection?: {
    enabled: boolean;
    selected: string[];
    onSelectionChange: (selected: string[]) => void;
  };
  onRowClick?: (row: T) => void;
  onSort?: (field: keyof T, direction: 'asc' | 'desc') => void;
}

// Usage Example:
<DataTable
  columns={[
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'status', headerName: 'Status', renderCell: (row) => (
      <StatusBadge status={row.status} />
    )}
  ]}
  data={users}
  loading={loading}
  pagination={{
    page: 1,
    pageSize: 10,
    total: 100,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange
  }}
/>
```

### 2. StatusBadge
```tsx
type StatusType = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'small' | 'medium' | 'large';
  withDot?: boolean;
}

const statusConfig: Record<StatusType, { color: string; label: string }> = {
  active: { color: '#2e7d32', label: 'Active' },
  inactive: { color: '#d32f2f', label: 'Inactive' },
  pending: { color: '#ed6c02', label: 'Pending' },
  approved: { color: '#2e7d32', label: 'Approved' },
  rejected: { color: '#d32f2f', label: 'Rejected' }
};

// Usage Example:
<StatusBadge status="active" size="medium" withDot />
```

### 3. SearchBar
```tsx
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  onSearch?: (value: string) => void;
}

// Usage Example:
<SearchBar
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Search users..."
  debounceMs={300}
  onSearch={handleSearch}
/>
```

## Form Components

### 1. FormTextField
```tsx
interface FormTextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
}

// Usage Example:
<FormTextField
  name="email"
  label="Email Address"
  value={email}
  onChange={handleEmailChange}
  type="email"
  required
  error={errors.email}
/>
```

### 2. FormSelect
```tsx
interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  multiple?: boolean;
}

// Usage Example:
<FormSelect
  name="role"
  label="User Role"
  value={role}
  options={[
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'guard', label: 'Guard' }
  ]}
  onChange={handleRoleChange}
  required
/>
```

## Dashboard Components

### 1. StatCard
```tsx
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

// Usage Example:
<StatCard
  title="Total Users"
  value={250}
  icon={<PeopleIcon />}
  color="#1976d2"
  trend={{ value: 5, direction: 'up' }}
/>
```

### 2. ActivityTimeline
```tsx
interface TimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
}

interface ActivityTimelineProps {
  items: TimelineItem[];
  loading?: boolean;
  maxItems?: number;
}

// Usage Example:
<ActivityTimeline
  items={[
    {
      id: '1',
      title: 'New User Added',
      description: 'John Doe was added as Manager',
      timestamp: '2024-03-15T10:00:00Z',
      type: 'success'
    }
  ]}
  maxItems={5}
/>
```

## Layout Components

### 1. PageHeader
```tsx
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
}

// Usage Example:
<PageHeader
  title="User Management"
  subtitle="Manage system users and their roles"
  actions={
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={handleAddUser}
    >
      Add User
    </Button>
  }
  breadcrumbs={[
    { label: 'Dashboard', href: '/' },
    { label: 'Users' }
  ]}
/>
```

### 2. SideNav
```tsx
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  children?: NavItem[];
}

interface SideNavProps {
  items: NavItem[];
  collapsed?: boolean;
  onCollapse?: () => void;
  selectedId?: string;
}

// Usage Example:
<SideNav
  items={[
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      href: '/dashboard'
    },
    {
      id: 'users',
      label: 'Users',
      icon: <PeopleIcon />,
      href: '/users',
      children: [
        {
          id: 'user-list',
          label: 'User List',
          href: '/users/list'
        }
      ]
    }
  ]}
  collapsed={false}
/>
```

## Modal Components

### 1. ConfirmationDialog
```tsx
interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  severity?: 'info' | 'success' | 'warning' | 'error';
}

// Usage Example:
<ConfirmationDialog
  open={showDialog}
  title="Delete User"
  message="Are you sure you want to delete this user?"
  confirmLabel="Delete"
  onConfirm={handleDeleteUser}
  onCancel={() => setShowDialog(false)}
  severity="error"
/>
```

### 2. FormDialog
```tsx
interface FormDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  loading?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

// Usage Example:
<FormDialog
  open={showForm}
  title="Add User"
  onClose={() => setShowForm(false)}
  onSubmit={handleSubmit}
  loading={loading}
  maxWidth="sm"
>
  <UserForm />
</FormDialog>
```

## Animation Components

### 1. FadeIn
```tsx
interface FadeInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

// Usage Example:
<FadeIn duration={300} delay={100}>
  <StatCard title="Total Users" value={250} />
</FadeIn>
```

### 2. AnimatedCounter
```tsx
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatter?: (value: number) => string;
}

// Usage Example:
<AnimatedCounter
  value={1000}
  duration={1000}
  prefix="$"
  formatter={(value) => value.toLocaleString()}
/>
```

## Loading Components

### 1. LoadingOverlay
```tsx
interface LoadingOverlayProps {
  loading: boolean;
  text?: string;
  children: React.ReactNode;
}

// Usage Example:
<LoadingOverlay loading={isLoading} text="Loading data...">
  <DataTable data={data} columns={columns} />
</LoadingOverlay>
```

### 2. Skeleton
```tsx
interface SkeletonProps {
  variant: 'text' | 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave';
}

// Usage Example:
<Skeleton
  variant="rectangular"
  width="100%"
  height={200}
  animation="wave"
/>
```

## Responsive Design

### Breakpoints
```typescript
const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};

// Usage with styled-components
const ResponsiveComponent = styled.div`
  padding: 16px;

  @media (min-width: ${breakpoints.sm}px) {
    padding: 24px;
  }

  @media (min-width: ${breakpoints.md}px) {
    padding: 32px;
  }
`;
```

### Grid System
```tsx
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <StatCard />
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <StatCard />
  </Grid>
</Grid>
```

## Theme Customization

### Theme Provider
```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0'
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  }
});

// Usage
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

This documentation will be continuously updated as new components are added or existing ones are modified. 