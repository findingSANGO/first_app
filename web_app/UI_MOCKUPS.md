# Entry Management System - UI Mockups

## Color Palette

### Primary Colors
```css
/* Main Brand Colors */
.primary-main {
    background: #1976d2;  /* Deep Blue */
    color: #ffffff;
}

.primary-light {
    background: #42a5f5;  /* Light Blue */
    color: #000000;
}

.primary-dark {
    background: #1565c0;  /* Dark Blue */
    color: #ffffff;
}

/* Secondary Colors */
.secondary-main {
    background: #9c27b0;  /* Purple */
    color: #ffffff;
}

.secondary-light {
    background: #ba68c8;  /* Light Purple */
    color: #000000;
}

.secondary-dark {
    background: #7b1fa2;  /* Dark Purple */
    color: #ffffff;
}
```

## Typography System

### Font Hierarchy
```css
/* Headings */
h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 2.5rem;  /* 40px */
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.5px;
}

h2 {
    font-family: 'Roboto', sans-serif;
    font-size: 2rem;    /* 32px */
    font-weight: 500;
    line-height: 1.3;
    letter-spacing: -0.25px;
}

/* Body Text */
.body-large {
    font-family: 'Roboto', sans-serif;
    font-size: 1.125rem;  /* 18px */
    line-height: 1.5;
}

.body-regular {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;      /* 16px */
    line-height: 1.5;
}

.body-small {
    font-family: 'Roboto', sans-serif;
    font-size: 0.875rem;  /* 14px */
    line-height: 1.4;
}
```

## Component Library

### Buttons
```css
/* Primary Button */
.button-primary {
    background: #1976d2;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.button-primary:hover {
    background: #1565c0;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* Secondary Button */
.button-secondary {
    background: white;
    color: #1976d2;
    border: 2px solid #1976d2;
    padding: 10px 24px;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
}

/* Icon Button */
.button-icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    transition: all 0.2s ease;
}
```

### Cards
```css
/* Dashboard Stat Card */
.stat-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

/* Action Card */
.action-card {
    background: linear-gradient(135deg, #1976d2, #1565c0);
    color: white;
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.action-card:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(25,118,210,0.2);
}
```

### Form Elements
```css
/* Text Input */
.input-field {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;
}

.input-field:focus {
    border-color: #1976d2;
    box-shadow: 0 0 0 4px rgba(25,118,210,0.1);
}

/* Select Dropdown */
.select-field {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    appearance: none;
}

/* Checkbox */
.checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid #1976d2;
    border-radius: 4px;
    transition: all 0.2s ease;
}
```

## Layout Specifications

### Grid System
```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
}

/* Responsive breakpoints */
@media (max-width: 1200px) {
    .container {
        max-width: 960px;
    }
}

@media (max-width: 992px) {
    .container {
        max-width: 720px;
    }
}

@media (max-width: 768px) {
    .container {
        max-width: 540px;
    }
}
```

### Navigation
```css
.navbar {
    height: 64px;
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.sidebar {
    width: 280px;
    background: white;
    height: 100vh;
    position: fixed;
    left: 0;
    padding: 24px;
    box-shadow: 2px 0 8px rgba(0,0,0,0.05);
}
```

## Animation Specifications

### Transitions
```css
/* Page Transitions */
.page-enter {
    opacity: 0;
    transform: translateY(20px);
}

.page-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.3s ease;
}

/* Component Animations */
.fade-in {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### Loading States
```css
/* Spinner */
.spinner {
    width: 24px;
    height: 24px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #1976d2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Skeleton Loading */
.skeleton {
    background: linear-gradient(
        90deg,
        #f0f0f0 25%,
        #f8f8f8 50%,
        #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
```

## Responsive Design

### Breakpoints
```css
/* Extra small devices (phones) */
@media (max-width: 576px) {
    .container {
        padding: 16px;
    }
    
    .grid {
        gap: 16px;
    }
    
    h1 {
        font-size: 2rem;
    }
}

/* Small devices (tablets) */
@media (max-width: 768px) {
    .sidebar {
        transform: translateX(-100%);
    }
    
    .main-content {
        margin-left: 0;
    }
}

/* Medium devices (laptops) */
@media (max-width: 992px) {
    .stat-card {
        padding: 16px;
    }
}

/* Large devices (desktops) */
@media (max-width: 1200px) {
    .container {
        max-width: 960px;
    }
}
```

## Interactive States

### Hover States
```css
/* Card Hover */
.interactive-card {
    transition: all 0.3s ease;
}

.interactive-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

/* Button Hover */
.button:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
}
```

### Focus States
```css
/* Input Focus */
.input:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 4px rgba(25,118,210,0.1);
}

/* Interactive Element Focus */
.interactive-element:focus {
    outline: 2px solid #1976d2;
    outline-offset: 2px;
}
```

## Theme Variations

### Light Theme
```css
.theme-light {
    --background: #ffffff;
    --surface: #f5f5f5;
    --text-primary: #212121;
    --text-secondary: #757575;
    --border: #e0e0e0;
}
```

### Dark Theme
```css
.theme-dark {
    --background: #121212;
    --surface: #1e1e1e;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --border: #2c2c2c;
}
```

These UI mockups provide detailed specifications for implementing the Entry Management System's user interface. The specifications include color schemes, typography, component styles, layouts, animations, and responsive design considerations. 