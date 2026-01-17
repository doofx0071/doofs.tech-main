# Admin Panel Setup Guide

## Overview

This project includes a secure admin panel with authentication powered by Convex. The admin route is configurable via environment variables for added security.

## Setup Instructions

### 1. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update the `.env` file with your values:

```env
# Get this from https://dashboard.convex.dev after creating your project
VITE_CONVEX_URL=https://your-deployment.convex.cloud

# Customize this to any path you want (keep it secret!)
VITE_ADMIN_ROUTE=/admin-122303
```

### 2. Start Convex Development Server

```bash
npx convex dev
```

This will:
- Connect to your Convex deployment
- Generate TypeScript types
- Watch for changes in your `convex/` directory

### 3. Create Your First Admin User

1. Navigate to the admin login page: `http://localhost:8080/admin-122303/login`
2. Click "Sign up" to create an account
3. Enter your email and password (minimum 8 characters)

### 4. Manually Set Admin Role

After creating your account, you need to manually set the admin role in the Convex dashboard:

1. Go to https://dashboard.convex.dev
2. Select your project
3. Go to "Data" tab
4. Find the `users` table
5. Find your user entry
6. Edit the document and add: `role: "admin"`

### 5. Access Admin Dashboard

Now you can log in at `http://localhost:8080/admin-122303/login` and access the admin dashboard!

## Admin Panel Features

- **User Management**: View all registered users
- **Role Management**: See who has admin vs regular user access
- **Statistics**: View total users, admin users, and regular users
- **Secure Authentication**: Password-based auth with Convex
- **Protected Routes**: Non-admin users cannot access the dashboard

## Security Best Practices

1. **Change the Admin Route**: Modify `VITE_ADMIN_ROUTE` to a unique, hard-to-guess path
2. **Use Strong Passwords**: Minimum 8 characters for all admin accounts
3. **Limit Admin Users**: Only give admin role to trusted users
4. **Monitor Access**: Check the users table regularly in Convex dashboard

## Customizing the Admin Route

You can change the admin panel URL anytime by updating `VITE_ADMIN_ROUTE` in `.env`:

```env
# Before
VITE_ADMIN_ROUTE=/admin-122303

# After (more secure)
VITE_ADMIN_ROUTE=/my-secret-admin-panel-xyz-789
```

After changing, restart your dev server:

```bash
npm run dev
```

## Routes

With default configuration:

- Admin Login: `http://localhost:8080/admin-122303/login`
- Admin Dashboard: `http://localhost:8080/admin-122303`

## Troubleshooting

### "VITE_CONVEX_URL is not set"

Make sure you've:
1. Created a `.env` file
2. Added `VITE_CONVEX_URL` with your Convex deployment URL
3. Restarted the dev server

### "Not authenticated" errors

Make sure:
1. You've run `npx convex dev` 
2. Your Convex deployment is running
3. You're logged in through the login page

### "Access Denied" on dashboard

Your user needs the `role: "admin"` field. Set it manually in the Convex dashboard.

## Development

The admin panel is built with:

- **Convex** - Backend and authentication
- **React Router** - Routing
- **shadcn/ui** - UI components
- **TailwindCSS** - Styling

Admin-related files:
- `convex/auth.ts` - Authentication configuration
- `convex/schema.ts` - Database schema with user roles
- `convex/admin.ts` - Admin queries and mutations
- `src/pages/AdminLogin.tsx` - Login page
- `src/pages/AdminDashboard.tsx` - Dashboard page
