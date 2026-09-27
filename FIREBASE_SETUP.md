# Firebase Migration Guide

This project has been migrated from Supabase to Firebase for authentication and database operations.

## Setup Instructions

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Set up Firestore rules (start in test mode for development)

### 2. Get Firebase Configuration

#### For Frontend (Client SDK)
1. In Firebase Console, go to Project Settings
2. Scroll down to "Your apps" section
3. Add a web app
4. Copy the firebaseConfig object values:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

#### For Backend (Admin SDK)
1. In Firebase Console, go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract these values from the JSON:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (replace `\n` with actual newlines)
   - `client_email` → `FIREBASE_CLIENT_EMAIL`

### 3. Update Environment Variables

Copy `.env.example` to `.env` and fill in the Firebase values:

```bash
# Backend Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com

# Frontend Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 4. Firestore Database Structure

The following collections will be created automatically:

- `user_profiles` - User profile data
- `communication_twins` - AI twin configurations
- `sessions` - Voice session data
- `messages` - Conversation messages
- `session_metrics` - Performance metrics
- `feedback` - Session feedback

### 5. Firestore Security Rules (Development)

For development, use these rules in Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Note:** Change these rules for production to restrict access based on authentication.

## Key Changes from Supabase

### Frontend
- Replaced `@supabase/supabase-js` with `firebase`
- Updated `supabaseClient.ts` → `firebaseClient.ts`
- Changed imports from `saveProfileToSupabase` to `saveProfileToFirebase`
- Changed imports from `saveSessionToSupabase` to `saveSessionToFirebase`

### Backend
- Replaced `@supabase/supabase-js` with `firebase-admin`
- Updated `supabase.ts` → `firebase.ts`
- Updated authentication routes to use Firebase Admin SDK
- Same fallback mechanism for demo mode

## Functionality

The app maintains the same functionality:
- User authentication (signup/login)
- Profile and twin configuration storage
- Session data, messages, metrics, and feedback storage
- Fallback to local state if Firebase is not configured

## Testing

1. Start the backend: `cd backend && npm run dev`
2. Start the frontend: `cd frontend && npm run dev`
3. Test signup/login functionality
4. Test profile creation and session storage
5. Check Firebase Console to verify data is being stored

## Troubleshooting

### Firebase Authentication Issues
- Ensure Email/Password sign-in provider is enabled in Firebase Console
- Check that your Firebase project is in the correct region
- Verify environment variables are correctly set

### Firestore Issues
- Ensure Firestore is created (not just Realtime Database)
- Check that your database rules allow writes
- Verify the project ID matches between frontend and backend

### Build Issues
- Remove old Supabase dependencies: `npm uninstall @supabase/supabase-js`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Production Considerations

1. **Security Rules**: Update Firestore rules to restrict access based on user authentication
2. **Indexing**: Create Firestore indexes for common queries
3. **Monitoring**: Set up Firebase Crashlytics and Analytics
4. **Backup**: Enable Firebase automatic backups
5. **Scaling**: Monitor Firestore usage and pricing