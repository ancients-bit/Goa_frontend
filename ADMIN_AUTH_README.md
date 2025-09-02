# Admin Authentication System

This document describes the complete admin authentication system for the Garden of Ancients website, built with Next.js frontend and Rails backend using Devise authentication.

## Overview

The system provides secure, session-based authentication for admin users with protected routes, automatic redirects, and a professional admin interface.

## Architecture

### Frontend (Next.js)
- **Authentication Context**: Global state management for admin authentication
- **Protected Routes**: Wrapper component that redirects unauthenticated users
- **Session Management**: Cookie-based authentication with automatic session checks
- **API Integration**: Secure API calls with proper error handling

### Backend (Rails + Devise)
- **Devise Authentication**: Standard Rails authentication with admin model
- **Session Management**: HTTP-only cookies for security
- **CSRF Protection**: Built-in Rails CSRF protection
- **Admin Routes**: Namespaced admin endpoints

## Components

### Core Authentication Components

#### 1. AuthContext (`components/admin/AuthContext.tsx`)
- Manages global authentication state
- Handles login, logout, and authentication checks
- Provides authentication methods to all admin components

**Key Features:**
- Automatic authentication check on app load
- Session persistence across page refreshes
- Automatic logout on session expiry
- Redirect handling after authentication actions

#### 2. ProtectedRoute (`components/admin/ProtectedRoute.tsx`)
- Wraps admin pages requiring authentication
- Shows loading state while checking authentication
- Automatically redirects to login if not authenticated

#### 3. AdminLoginPage (`app/admin/login/page.tsx`)
- Professional login form with validation
- Error handling for invalid credentials
- Remember me functionality
- Password reset link

#### 4. AdminDashboard (`components/admin/AdminDashboard.tsx`)
- Main admin dashboard with statistics
- Navigation to all admin sections
- Quick action buttons
- User information display

#### 5. AdminNavigation (`components/admin/AdminNavigation.tsx`)
- Consistent navigation across all admin pages
- Responsive design for mobile/desktop
- Active page highlighting
- User menu with logout

### Utility Components

#### 1. useAdminApi Hook (`hooks/useAdminApi.ts`)
- Centralized API calling with authentication
- Automatic error handling for 401/403 responses
- Consistent request formatting
- Network error handling

## API Endpoints

### Authentication Endpoints
- `POST /admin/sessions` - Admin login
- `DELETE /admin/sessions` - Admin logout
- `POST /admin/passwords` - Password reset request

### Protected Admin Endpoints
- `GET /admin/dashboard` - Dashboard data and stats
- `GET /admin/contacts` - Contact form submissions
- `GET /admin/bookings` - Booking management
- `GET /admin/blog` - Blog post management
- `GET /admin/testimonials` - Testimonial management

## Authentication Flow

### 1. Login Process
1. User navigates to `/admin/login`
2. Enters email and password
3. Form validates input
4. POST request to `/admin/sessions`
5. Backend validates credentials
6. On success: sets session cookie, redirects to dashboard
7. On failure: displays error message

### 2. Protected Route Access
1. User tries to access protected admin page
2. `ProtectedRoute` component checks authentication
3. If authenticated: renders page content
4. If not authenticated: redirects to login
5. If loading: shows loading spinner

### 3. Session Management
1. App loads and checks authentication status
2. Makes request to `/admin/dashboard` with credentials
3. Backend validates session cookie
4. Updates authentication state accordingly
5. Handles session expiry automatically

### 4. Logout Process
1. User clicks logout button
2. DELETE request to `/admin/sessions`
3. Backend clears session
4. Frontend clears authentication state
5. Redirects to login page

## Security Features

### Frontend Security
- No sensitive data stored in localStorage
- All API calls include `credentials: 'include'`
- Automatic logout on 401 responses
- Protected route wrapper prevents unauthorized access
- Form validation prevents invalid submissions

### Backend Security (Rails)
- HTTP-only cookies for session management
- CSRF protection on all requests
- Devise authentication with secure defaults
- Session timeout and expiry handling
- Secure password hashing

## Error Handling

### Network Errors
- Connection failures
- Timeout handling
- Retry mechanisms

### Authentication Errors
- Invalid credentials (401)
- Insufficient permissions (403)
- Session expiry
- Server errors (500)

### User Experience
- Clear error messages
- Loading states
- Smooth transitions
- Responsive design

## Environment Configuration

### Required Environment Variables
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Backend Configuration (Rails)
```ruby
# config/routes.rb
namespace :admin do
  devise_for :admins, controllers: {
    sessions: 'admin/sessions',
    passwords: 'admin/passwords'
  }
  
  get 'dashboard', to: 'admin#dashboard'
  resources :contacts, only: [:index]
  # ... other admin resources
end
```

## Usage Examples

### Using Protected Routes
```tsx
import { ProtectedRoute } from '../components/admin/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <div>Protected admin content</div>
    </ProtectedRoute>
  );
}
```

### Using Authentication Context
```tsx
import { useAuth } from '../components/admin/AuthContext';

export default function AdminComponent() {
  const { admin, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) return null;
  
  return (
    <div>
      <p>Welcome, {admin?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Making Authenticated API Calls
```tsx
import { useAdminApi } from '../hooks/useAdminApi';

export default function AdminComponent() {
  const api = useAdminApi();
  
  const fetchData = async () => {
    try {
      const data = await api.get('/admin/contacts');
      // Handle data
    } catch (error) {
      // Handle error
    }
  };
};
```

## Testing

### Frontend Testing
- Unit tests for authentication context
- Component testing for protected routes
- Integration tests for login flow
- Error handling tests

### Backend Testing
- Devise authentication tests
- Admin controller tests
- Session management tests
- CSRF protection tests

## Deployment Considerations

### Frontend (Next.js)
- Set `NEXT_PUBLIC_API_URL` for production
- Ensure HTTPS in production
- Configure proper CORS settings

### Backend (Rails)
- Set secure session configuration
- Configure proper cookie settings
- Set up CSRF token handling
- Configure Devise for production

## Troubleshooting

### Common Issues

#### 1. Authentication Not Persisting
- Check cookie settings in Rails
- Verify `credentials: 'include'` in fetch calls
- Check session configuration

#### 2. CORS Errors
- Configure CORS in Rails backend
- Ensure proper origin settings
- Check preflight request handling

#### 3. Session Expiry Issues
- Verify session timeout settings
- Check cookie expiration
- Test automatic logout functionality

#### 4. Redirect Loops
- Check authentication state logic
- Verify route protection
- Debug redirect conditions

## Future Enhancements

### Planned Features
- Two-factor authentication (2FA)
- Role-based access control
- Audit logging
- Session management dashboard
- Bulk operations
- Advanced search and filtering

### Security Improvements
- Rate limiting
- IP whitelisting
- Advanced session security
- Security headers
- Penetration testing

## Support

For technical support or questions about the authentication system, please refer to the development team or create an issue in the project repository.

## License

This authentication system is part of the Garden of Ancients project and follows the same licensing terms.
