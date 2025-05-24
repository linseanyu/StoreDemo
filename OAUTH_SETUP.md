# OAuth Provider Setup Guide

## Required Environment Variables

Add these variables to your `.env` file:

```bash
# NextAuth.js
AUTH_SECRET="BZD/9Jq3pCMITM2ypo6IxQ1wp6Ii9mojgPElSwDHaEc="
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id_here"
GOOGLE_CLIENT_SECRET="your_google_client_secret_here"

# GitHub OAuth  
GITHUB_CLIENT_ID="your_github_client_id_here"
GITHUB_CLIENT_SECRET="your_github_client_secret_here"
```

## Setting up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" and create "OAuth 2.0 Client ID"
5. Add these authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the Client ID and Client Secret to your `.env` file

## Setting up GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: Your app name
   - Homepage URL: `http://localhost:3000` (development)
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env` file

## Testing Authentication

After setting up the environment variables:

1. Restart your development server: `npm run dev`
2. Visit `http://localhost:3000/login` to test login
3. Visit `http://localhost:3000/register` to test registration
4. Visit `http://localhost:3000/dashboard` to test protected routes

## Features Implemented

✅ **Email/Password Authentication**
- Registration with validation
- Login with credentials
- Password hashing with bcryptjs

✅ **OAuth Providers**
- Google OAuth integration
- GitHub OAuth integration
- Automatic user creation for OAuth

✅ **JWT Handling**
- JWT strategy configuration
- Role-based authentication
- Custom JWT callbacks

✅ **Protected Routes**
- Middleware-based protection
- Automatic redirects
- Session management

## Available Routes

- `/login` - Sign in page
- `/register` - Sign up page  
- `/dashboard` - Protected user dashboard
- `/api/auth/register` - Registration API endpoint
- `/api/auth/[...nextauth]` - NextAuth API routes 