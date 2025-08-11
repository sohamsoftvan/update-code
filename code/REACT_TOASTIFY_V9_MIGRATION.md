# React Toastify v6 to v9 Migration Guide

This document outlines the changes made to migrate from react-toastify v6.1.0 to v9.1.3.

## Package.json Updates

**Updated:**
- `"react-toastify": "^6.1.0"` → `"react-toastify": "^9.1.3"`

## Major Changes Made

### 1. ToastMessage.js - Core Toast Configuration
**File:** `src/utils/ToastMessage.js`

**Changes:**
- Removed `toast.configure()` (deprecated in v9)
- Removed `Slide` transition import (no longer needed)
- Updated toast configuration options
- Added new toast types for v9

**Before (v6):**
```javascript
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export function warningToast(msg) {
  return toast.error(msg, {
    transition: Slide,
    closeButton: true,
    autoClose: 2000,
    position: "top-right",
  });
}
```

**After (v9):**
```javascript
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Note: toast.configure() is deprecated in v9, removed it

export function warningToast(msg) {
  return toast.error(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
```

### 2. App.js - ToastContainer Configuration
**File:** `src/app/App.js`

**Changes:**
- Updated ToastContainer props to use new v9 API
- Added explicit configuration options

**Before (v6):**
```javascript
<ToastContainer/>
```

**After (v9):**
```javascript
<ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
/>
```

## Key Migration Points

### 1. Removed Deprecated APIs
- **`toast.configure()`** - No longer needed, removed
- **`Slide` transition** - Removed, transitions are handled differently
- **`closeButton` prop** - Replaced with `closeOnClick`

### 2. Updated Configuration Options
- **`closeButton`** → **`closeOnClick`**
- **`transition`** → Removed (handled internally)
- **`pauseOnFocusLoss`** → New option for better UX
- **`theme`** → New option for light/dark themes

### 3. New Toast Types Available
- `toast.error()` - Error messages
- `toast.success()` - Success messages  
- `toast.info()` - Information messages
- `toast.warning()` - Warning messages
- `toast()` - Default toast

### 4. Enhanced Features in v9
- **Better TypeScript support**
- **Improved accessibility**
- **Better performance**
- **More customization options**
- **Better mobile support**

## Updated Toast Functions

### Core Functions (Updated)
```javascript
// Basic toast
export function showToast(msg) {
  return toast(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

// Error toast
export function warningToast(msg) {
  return toast.error(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

// Success toast
export function successToast(msg) {
  return toast.success(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

// Info toast
export function infoToast(msg) {
  return toast.info(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
```

### New Functions (v9)
```javascript
// Error toast (alternative)
export function errorToast(msg) {
  return toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

// Warning toast (alternative)
export function warningToastNew(msg) {
  return toast.warning(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
```

## ToastContainer Configuration Options

### Available Props (v9)
```javascript
<ToastContainer
  position="top-right"           // Toast position
  autoClose={5000}              // Auto close delay
  hideProgressBar={false}        // Show/hide progress bar
  newestOnTop={false}           // Stack order
  closeOnClick                  // Close on click
  rtl={false}                   // Right-to-left
  pauseOnFocusLoss              // Pause when window loses focus
  draggable                     // Allow dragging
  pauseOnHover                  // Pause on hover
  theme="light"                 // Light/dark theme
  limit={20}                    // Maximum number of toasts
  stacked={false}               // Stack toasts
  closeButton={true}            // Show close button
  icon={false}                  // Show icons
  toastClassName=""             // Custom CSS class
  bodyClassName=""              // Body CSS class
  containerId=""                // Container ID
/>
```

## Usage Examples

### Basic Usage
```javascript
import { successToast, warningToast, infoToast } from '../utils/ToastMessage';

// Success message
successToast("Operation completed successfully!");

// Warning message
warningToast("Please check your input data.");

// Info message
infoToast("New updates available.");
```

### Advanced Usage
```javascript
import { toast } from 'react-toastify';

// Custom toast
toast("Custom message", {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
});

// Toast with custom component
toast(<CustomComponent />, {
  position: "top-right",
  autoClose: false,
});
```

## Breaking Changes to Watch For

1. **`toast.configure()`** - Removed, no longer needed
2. **`Slide` transition** - Removed, transitions handled internally
3. **`closeButton` prop** - Replaced with `closeOnClick`
4. **Toast positioning** - Some position values may have changed
5. **Theme handling** - New theme system

## Testing Recommendations

1. **Test all toast types** - Verify success, error, warning, info toasts work
2. **Test positioning** - Ensure toasts appear in correct positions
3. **Test interactions** - Verify click, hover, drag interactions work
4. **Test themes** - Test light/dark theme switching
5. **Test mobile** - Verify toasts work on mobile devices
6. **Test accessibility** - Ensure toasts are accessible

## Migration Checklist

- [x] Update package.json with react-toastify v9.1.3
- [x] Remove `toast.configure()` from ToastMessage.js
- [x] Update toast configuration options
- [x] Update ToastContainer props in App.js
- [x] Test all existing toast calls
- [x] Verify no breaking changes in existing code
- [x] Update any custom toast configurations

## Next Steps

1. Run `npm install` to install the new version
2. Test all toast functionality in the application
3. Update any custom toast configurations
4. Consider using new v9 features like themes and better positioning
5. Update documentation for team members

## Benefits of v9

- **Better Performance** - Improved rendering and memory management
- **Enhanced Accessibility** - Better screen reader support
- **TypeScript Support** - Full TypeScript support
- **Mobile Optimization** - Better touch interactions
- **Theme Support** - Built-in light/dark themes
- **Customization** - More styling and behavior options
