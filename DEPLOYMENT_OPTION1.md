# Option 1 Deployment Guide: Vercel (Frontend) + Render (Backend)

This is the recommended deployment option for VoiceTwin. It's free to start, easy to set up, and provides excellent performance.

## Prerequisites

Before starting, make sure you have:
- ✅ GitHub account with repository pushed
- ✅ Vercel account (sign up at vercel.com)
- ✅ Render account (sign up at render.com)
- ✅ Firebase project configured
- ✅ Agora account configured
- ✅ All environment variables ready

## Step 1: Deploy Backend to Render

### 1.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Click "Sign Up" and sign up with GitHub
3. Verify your email if required

### 1.2 Deploy Backend
1. After logging in, click "New +"
2. Select "Web Service"
3. Click "Connect GitHub" (if not already connected)
4. Authorize Render to access your GitHub
5. Select your repository: `VoiceTwin---AI-Communication-Twin`
6. Configure the service:

**Basic Settings:**
- **Name**: `voicetwin-backend`
- **Region**: Choose nearest region (e.g., Oregon for US)
- **Branch**: `main`

**Build & Deploy:**
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

**Advanced:**
- **Instance Type**: `Free` (to start)

### 1.3 Add Environment Variables
Scroll down to "Environment Variables" section and add:

```
NODE_ENV=production
PORT=3000
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_DATABASE_URL=your_firebase_database_url
AGORA_APP_ID=your_agora_app_id
AGORA_APP_CERTIFICATE=your_agora_app_certificate
AUTH_SECRET=your_long_random_secret_string
```

**Important:**
- Replace the placeholder values with your actual credentials
- For `FIREBASE_PRIVATE_KEY`, make sure to include the full key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- The `AUTH_SECRET` should be a long random string (you can generate one using: `openssl rand -base64 32`)

### 1.4 Deploy
1. Click "Create Web Service"
2. Wait for the deployment to complete (2-5 minutes)
3. Once deployed, you'll get a URL like: `https://voicetwin-backend.onrender.com`
4. **Copy this URL** - you'll need it for the frontend setup

### 1.5 Verify Backend
1. Click on your service to see the dashboard
2. Check the "Logs" tab to ensure it started successfully
3. Test the health endpoint (if you have one): `https://voicetwin-backend.onrender.com/health`

## Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and sign up with GitHub
3. Verify your email if required

### 2.2 Deploy Frontend
1. After logging in, click "Add New Project"
2. Click "Import" on your VoiceTwin repository
3. Vercel will automatically detect it's a Vite project

### 2.3 Configure Project Settings

**Framework Preset:**
- **Framework**: Vite
- **Project Name**: `voicetwin-frontend` (or your preferred name)

**Build & Development Settings:**
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**Environment Variables:**
Click "Environment Variables" and add:

```
VITE_API_URL=https://voicetwin-backend.onrender.com
VITE_AGORA_APP_ID=your_agora_app_id
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_DEMO_MODE=false
```

**Important:**
- Replace `https://voicetwin-backend.onrender.com` with your actual Render backend URL
- Use your actual Firebase credentials from Firebase Console
- Set `VITE_DEMO_MODE=false` for production

### 2.4 Deploy
1. Click "Deploy"
2. Wait for deployment to complete (1-3 minutes)
3. Once deployed, you'll get a URL like: `https://voicetwin-frontend.vercel.app`

### 2.5 Verify Frontend
1. Click on your deployed URL
2. The application should load
3. Try navigating through the pages
4. Test authentication if you have Firebase configured

## Step 3: Update Environment Variables (if needed)

### 3.1 If Backend URL Changed
If your Render backend URL is different from what you set in Vercel:

1. Go to Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Update `VITE_API_URL` with the correct backend URL
4. Redeploy the frontend

### 3.2 If You Need to Add More Variables
1. Add the new environment variable
2. Click "Redeploy" to apply changes

## Step 4: Configure Firebase for Production

### 4.1 Update Firebase Auth Domains
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to "Authentication" → "Sign-in method"
4. For "Email/Password", click the gear icon
5. Add your Vercel domain to "Authorized domains":
   - `voicetwin-frontend.vercel.app`
   - Your custom domain (if you have one)

### 4.2 Update Firestore Security Rules
1. Go to "Firestore Database" → "Rules"
2. Update rules for production:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /sessions/{sessionId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
3. Click "Publish"

### 4.3 Enable App Check (Optional but Recommended)
1. Go to "App Check" in Firebase Console
2. Click "Get Started"
3. Select "Web apps"
4. Register your Vercel domain
5. This helps prevent abuse of your Firebase resources

## Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain to Vercel
1. Go to Vercel project dashboard
2. Click "Settings" → "Domains"
3. Click "Add Domain"
4. Enter your domain (e.g., `voicetwin.com`)
5. Follow the DNS instructions provided by Vercel

### 5.2 Update Firebase Auth Domains
1. Go back to Firebase Console
2. Add your custom domain to "Authorized domains"

### 5.3 Update Environment Variables
1. Update `VITE_FIREBASE_AUTH_DOMAIN` in Vercel if needed
2. Redeploy frontend

## Step 6: Monitor and Test

### 6.1 Test the Application
1. Visit your Vercel URL
2. Test user registration/login
3. Create a practice session
4. Test voice functionality
5. Check that data is being saved to Firebase

### 6.2 Monitor Backend (Render)
1. Go to Render dashboard
2. Check "Logs" for any errors
3. Monitor "Metrics" for performance
4. Check "Events" for deployment history

### 6.3 Monitor Frontend (Vercel)
1. Go to Vercel dashboard
2. Check "Deployments" for build status
3. Enable "Analytics" for user insights
4. Check "Logs" for any frontend errors

## Step 7: Setup Continuous Deployment

Both Vercel and Render automatically set up continuous deployment from GitHub:

- **Every push to main branch**: Automatic deployment
- **Pull requests**: Preview deployments
- **Branch deployments**: Deploy different branches

### Deployment Workflow:
```bash
# Make changes locally
git add .
git commit -m "Your commit message"
git push origin main

# Automatic deployment happens:
# - Render builds and deploys backend
# - Vercel builds and deploys frontend
```

## Troubleshooting

### Common Issues:

**1. Backend API not responding**
- Check Render logs for errors
- Verify environment variables are set correctly
- Ensure the backend service is running (not stopped)

**2. Frontend can't connect to backend**
- Verify `VITE_API_URL` is correct in Vercel
- Check if backend is accessible via browser
- Look for CORS errors in browser console

**3. Firebase authentication fails**
- Check Firebase API keys are correct
- Verify domain is added to Firebase authorized domains
- Check Firebase Console for any authentication errors

**4. Build fails on Vercel**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify build command is correct

**5. Build fails on Render**
- Check build logs in Render dashboard
- Ensure Node version is compatible
- Verify all environment variables are set

**6. Agora voice not working**
- Verify Agora credentials are correct
- Check if Agora app is enabled
- Ensure network allows WebRTC connections

## Cost Information

### Free Tier Limits:

**Vercel (Hobby Plan - Free):**
- Unlimited deployments
- 100GB bandwidth per month
- SSL certificates included
- Custom domains supported

**Render (Free Tier):**
- 750 hours per month
- 512MB RAM
- Shared CPU
- Sleeps after 15 minutes of inactivity

### When to Upgrade:

**Vercel Pro ($20/month):**
- 1TB bandwidth
- Priority support
- Advanced analytics
- Team collaboration

**Render Starter ($7/month):**
- No sleep
- More RAM/CPU
- Faster build times
- Priority support

## Maintenance

### Regular Tasks:

**Weekly:**
- Check deployment logs for errors
- Monitor usage metrics
- Review Firebase costs

**Monthly:**
- Update dependencies
- Review and rotate secrets
- Check for security updates

**Quarterly:**
- Review and optimize costs
- Backup Firebase data
- Update documentation

## Security Checklist

- [ ] All environment variables are set
- [ ] Strong AUTH_SECRET is used
- [ ] Firebase security rules are configured
- [ ] HTTPS is enforced (automatic on Vercel/Render)
- [ ] Dependencies are regularly updated
- [ ] Error monitoring is set up
- [ ] Backup strategy is in place

## Next Steps

After successful deployment:

1. **Set up monitoring**: Add error tracking (Sentry, LogRocket)
2. **Add analytics**: Google Analytics or Vercel Analytics
3. **Configure backups**: Regular Firebase exports
4. **Set up alerts**: Render/Vercel notifications
5. **Document processes**: Update team documentation

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Firebase Docs**: https://firebase.google.com/docs
- **GitHub Issues**: https://github.com/Tanya-garg10/VoiceTwin---AI-Communication-Twin/issues

---

**Congratulations!** Your VoiceTwin application is now live on Vercel (frontend) and Render (backend).
