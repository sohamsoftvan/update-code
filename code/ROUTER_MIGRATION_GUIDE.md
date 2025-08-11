# React Router v7 Migration Guide

## Overview
This project has been migrated from React Router v6 to React Router v7 with a complete restructuring of the routing system. The migration includes proper lazy loading, role-based route protection, and a more organized route structure.

## Key Changes

### 1. Updated Dependencies
- `react-router-dom`: Updated to version 7.8.0
- All other dependencies updated to latest compatible versions

### 2. New Route Structure

#### Main Route Files:
- `src/app/Routes.js` - Main router configuration using `useRoutes`
- `src/app/MainRoutes.js` - Combined routes for all roles
- `src/app/LoginRoutes.js` - Authentication routes
- `src/app/SuperAdminRoutes.js` - SuperAdmin specific routes
- `src/app/ResultManagerRoutes.js` - ResultManager specific routes

#### Deprecated Files:
- `src/app/AdminBasePage.js` - Routes moved to MainRoutes.js
- `src/app/SuperAdminBasePage.js` - Routes moved to SuperAdminRoutes.js
- `src/app/ResultManagerBasePage.js` - Routes moved to ResultManagerRoutes.js

### 3. Route Organization

#### Admin Routes (`/admin/*`)
```
/admin/dashboard
/admin/cameras
/admin/allCamera
/admin/camera-logs
/admin/camera-status
/admin/model-categories
/admin/subscriptions
/admin/builder
/admin/locations
/admin/addSupervisor
/admin/employee
/admin/attendance
/admin/violation
```

#### SuperAdmin Routes (`/superadmin/*`)
```
/superadmin/dashboard
/superadmin/myResult
/superadmin/device
/superadmin/modelType
/superadmin/frameworkDetails
/superadmin/deploymentType
/superadmin/inferJobs
/superadmin/aiModel
/superadmin/deploymentDetails
/superadmin/deployedDetails
/superadmin/users
/superadmin/NotificationSend
/superadmin/locations
/superadmin/cameras
/superadmin/addSupervisor
/superadmin/subscriptions
/superadmin/allCamera
/superadmin/camera-status
/superadmin/camera-logs
/superadmin/company/company-user
/superadmin/company/company-user/add-company-user
/superadmin/company/company-user/configure-user
/superadmin/company/subscription-model
/superadmin/company/camera-label-mapping
/superadmin/company/frame-uploader
```

#### ResultManager Routes (`/resultmanager/*`)
```
/resultmanager/my-results
/resultmanager/events
/resultmanager/eventsList
/resultmanager/notificationAlert
/resultmanager/logo-results
```

#### Authentication Routes (`/auth/*`)
```
/auth/login
/auth/registration
/auth/user-registration
/auth/forgot-password
```

#### Common Routes
```
/logout (accessible by all roles)
/my-results (admin)
/my-events (admin)
/complaints (admin)
/feedbacks (admin)
/allNotification (admin)
```

### 4. Key Features

#### Lazy Loading
All components are now lazy-loaded using React.lazy() and the Loadable utility:

```javascript
const ComponentName = Loadable(lazy(() => import('./path/to/component')));
```

#### Role-Based Protection
Routes are protected using the `ProtectedRoute` component:

```javascript
const protectedRoute = (role, component) => (
    <ProtectedRoute routeRole={role}>{component}</ProtectedRoute>
);
```

#### Route Structure
Routes are organized by role and functionality, making the codebase more maintainable.

### 5. Migration Benefits

1. **Better Performance**: Lazy loading reduces initial bundle size
2. **Improved Organization**: Routes are grouped by role and functionality
3. **Enhanced Security**: Role-based route protection
4. **Better Maintainability**: Clear separation of concerns
5. **Future-Proof**: Compatible with React Router v7 features

### 6. Usage Examples

#### Adding New Admin Route
```javascript
// In MainRoutes.js
const adminRoutes = [
    // ... existing routes
    {
        path: "/admin/new-feature",
        element: protectedRoute([ADMIN_ROLE], <NewFeaturePage/>)
    },
];
```

#### Adding New SuperAdmin Route
```javascript
// In SuperAdminRoutes.js
const SuperAdminRoutes = [
    // ... existing routes
    {
        path: "/superadmin/new-feature",
        element: protectedRoute([SUPER_ADMIN_ROLE], <NewFeaturePage/>)
    },
];
```

#### Adding Multi-Role Route
```javascript
// In MainRoutes.js
{
    path: "/shared-feature",
    element: protectedRoute([ADMIN_ROLE, SUPER_ADMIN_ROLE], <SharedFeaturePage/>)
}
```

### 7. Important Notes

1. **Role Constants**: Use role constants from `src/enums/constant.js`
2. **Path Prefixes**: Admin routes use `/admin/`, SuperAdmin use `/superadmin/`, etc.
3. **Lazy Loading**: Always use Loadable wrapper for new components
4. **Protected Routes**: Always wrap components with protectedRoute function
5. **Layout**: All routes are wrapped in the Layout component automatically

### 8. Testing

After migration, test the following:
- All existing routes work correctly
- Role-based access control functions properly
- Lazy loading works as expected
- Navigation between routes is smooth
- Error pages are displayed correctly

### 9. Troubleshooting

#### Common Issues:
1. **Route not found**: Check if route is added to correct route file
2. **Access denied**: Verify role permissions in protectedRoute
3. **Component not loading**: Ensure proper lazy loading syntax
4. **Navigation issues**: Check route paths and Layout wrapper

#### Debug Steps:
1. Check browser console for errors
2. Verify route definitions in route files
3. Check role assignments in Redux state
4. Test with different user roles
