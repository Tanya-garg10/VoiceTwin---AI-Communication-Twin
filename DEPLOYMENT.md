# VoiceTwin Deployment Guide

This guide will help you deploy the VoiceTwin application to production. We'll cover multiple deployment options for both frontend and backend.

## Prerequisites

Before deploying, make sure you have:
- ✅ All environment variables configured
- ✅ Firebase project set up with Authentication and Firestore
- ✅ Agora account with App ID and Certificate
- ✅ Git repository initialized and pushed to GitHub
- ✅ Application builds successfully locally

## Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend) - Recommended

This is the easiest and most cost-effective option for modern web applications.

#### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your VoiceTwin repository
   - Configure settings:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Click "Deploy"

3. **Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add the following variables:
     ```
     VITE_API_URL=your-backend-url
     VITE_AGORA_APP_ID=your-agora-app-id
     VITE_FIREBASE_API_KEY=your-firebase-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-sender-id
     VITE_FIREBASE_APP_ID=your-firebase-app-id
     ```

#### Backend Deployment (Render)

1. **Prepare Backend**
   - Ensure backend has a proper `start` script in package.json
   - Add `engines` field to specify Node version:
     ```json
     "engines": {
       "node": ">=18.0.0"
     }
     ```

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Sign up/login with GitHub
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Configure settings:
     - **Name**: voicetwin-backend
     - **Root Directory**: `backend`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Environment**: Node
   - Add environment variables (see below)
   - Click "Create Web Service"

3. **Environment Variables in Render**
   ```
   PORT=3000
   NODE_ENV=production
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_PRIVATE_KEY=your-firebase-private-key
   FIREBASE_CLIENT_EMAIL=your-firebase-client-email
   FIREBASE_DATABASE_URL=your-firebase-database-url
   AGORA_APP_ID=your-agora-app-id
   AGORA_APP_CERTIFICATE=your-agora-app-certificate
   JWT_SECRET=your-jwt-secret
   ```

### Option 2: Netlify (Frontend) + Railway (Backend)

#### Frontend Deployment (Netlify)

1. **Build the frontend locally**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login
   - Drag and drop the `frontend/dist` folder
   - Or connect GitHub repository for continuous deployment

3. **Configure Netlify**
   - Site settings → Build & deploy
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variables in Site settings

#### Backend Deployment (Railway)

1. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up/login with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select `backend` as root directory
   - Add environment variables
   - Railway will automatically detect Node.js and deploy

### Option 3: Docker Deployment

For more control and consistency, you can deploy using Docker.

#### Create Dockerfile for Backend

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Create Dockerfile for Frontend

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Create nginx.conf for Frontend

Create `frontend/nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Create docker-compose.yml

Create `docker-compose.yml` in root:
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
      - FIREBASE_PRIVATE_KEY=${FIREBASE_PRIVATE_KEY}
      - FIREBASE_CLIENT_EMAIL=${FIREBASE_CLIENT_EMAIL}
      - AGORA_APP_ID=${AGORA_APP_ID}
      - AGORA_APP_CERTIFICATE=${AGORA_APP_CERTIFICATE}
      - JWT_SECRET=${JWT_SECRET}
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

#### Deploy Docker Containers

**Option A: Deploy to cloud providers**
- **AWS ECS**: Use AWS Elastic Container Service
- **Google Cloud Run**: Serverless container deployment
- **Azure Container Instances**: Azure's container service
- **DigitalOcean App Platform**: Simple container deployment

**Option B: Deploy to VPS**
```bash
# On your VPS
git clone https://github.com/Tanya-garg10/VoiceTwin---AI-Communication-Twin.git
cd VoiceTwin---AI-Communication-Twin
docker-compose up -d
```

### Option 4: Traditional VPS Deployment

Deploy to a VPS like DigitalOcean, Linode, or AWS EC2.

#### Server Setup

1. **Connect to your VPS**
   ```bash
   ssh user@your-vps-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install Nginx**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

4. **Install PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   ```

#### Deploy Backend

1. **Clone repository**
   ```bash
   git clone https://github.com/Tanya-garg10/VoiceTwin---AI-Communication-Twin.git
   cd VoiceTwin---AI-Communication-Twin/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Setup environment variables**
   ```bash
   nano .env
   # Add all your environment variables
   ```

5. **Start with PM2**
   ```bash
   pm2 start dist/index.js --name voicetwin-backend
   pm2 save
   pm2 startup
   ```

#### Deploy Frontend

1. **Build frontend**
   ```bash
   cd ../frontend
   npm run build
   ```

2. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/voicetwin
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       root /path/to/VoiceTwin---AI-Communication-Twin/frontend/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       location /api {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/voicetwin /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

#### Setup SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Firebase Configuration for Production

1. **Update Firebase Security Rules**
   - Go to Firebase Console → Firestore → Rules
   - Update rules for production:
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

2. **Enable App Check** (Optional but recommended)
   - Go to Firebase Console → App Check
   - Enable App Check for your web app
   - This helps prevent abuse of your backend resources

## Environment Variables Checklist

### Frontend Variables (VITE_*)
- `VITE_API_URL` - Backend API URL
- `VITE_AGORA_APP_ID` - Agora App ID
- `VITE_FIREBASE_API_KEY` - Firebase API Key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase Auth Domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase Project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase Storage Bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase Sender ID
- `VITE_FIREBASE_APP_ID` - Firebase App ID

### Backend Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (production)
- `FIREBASE_PROJECT_ID` - Firebase Project ID
- `FIREBASE_PRIVATE_KEY` - Firebase Private Key
- `FIREBASE_CLIENT_EMAIL` - Firebase Client Email
- `FIREBASE_DATABASE_URL` - Firebase Database URL
- `AGORA_APP_ID` - Agora App ID
- `AGORA_APP_CERTIFICATE` - Agora App Certificate
- `JWT_SECRET` - JWT Secret Key

## Post-Deployment Checklist

- [ ] Frontend is accessible via domain
- [ ] Backend API is responding
- [ ] Firebase authentication is working
- [ ] Agora voice connection is working
- [ ] Environment variables are properly set
- [ ] SSL/HTTPS is configured
- [ ] Database connections are working
- [ ] Error logging is set up
- [ ] Monitoring is configured
- [ ] Backup strategy is in place

## Monitoring and Maintenance

### Set up Monitoring
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Google Analytics**: User analytics
- **Render/Vercel Analytics**: Performance monitoring

### Regular Maintenance
- Update dependencies regularly
- Monitor error logs
- Check Firebase usage limits
- Review Agora usage and costs
- Backup database regularly
- Security updates

## Troubleshooting

### Common Issues

**1. Frontend not loading**
- Check build logs
- Verify environment variables
- Ensure API URL is correct

**2. Backend API errors**
- Check server logs
- Verify Firebase credentials
- Ensure port is accessible

**3. Firebase authentication fails**
- Check API key configuration
- Verify Firebase project settings
- Check allowed domains in Firebase

**4. Agora connection issues**
- Verify App ID and Certificate
- Check network connectivity
- Ensure firewall allows WebRTC

**5. Environment variables not working**
- Check variable names (case-sensitive)
- Verify values are properly escaped
- Restart services after changes

## Cost Estimation

### Free Tier Options
- **Vercel**: Free for personal projects
- **Render**: Free tier available
- **Firebase**: Generous free tier
- **Agora**: Free tier with limited minutes

### Estimated Monthly Costs (Production)
- **Hosting**: $0-20 (Vercel/Render free tiers)
- **Backend**: $5-25 (Render/Railway)
- **Firebase**: $0-25 (depending on usage)
- **Agora**: $0-50 (depending on voice minutes)
- **Domain**: $10-15/year
- **SSL**: Free (Let's Encrypt)

**Total**: $15-110/month for small to medium usage

## Scaling Considerations

When scaling the application:
1. **Database**: Consider sharding for Firestore
2. **Backend**: Use load balancers and multiple instances
3. **CDN**: Use Cloudflare for static assets
4. **Caching**: Implement Redis for session management
5. **Monitoring**: Set up comprehensive monitoring
6. **Auto-scaling**: Configure auto-scaling rules

## Security Best Practices

1. **Never commit** `.env` files to git
2. **Use strong** JWT secrets
3. **Enable** HTTPS only
4. **Implement** rate limiting
5. **Validate** all user inputs
6. **Keep** dependencies updated
7. **Use** CORS properly
8. **Enable** Firebase security rules
9. **Monitor** for suspicious activity
10. **Backup** data regularly

## Support

For deployment issues:
- Check deployment platform documentation
- Review logs and error messages
- GitHub Issues: https://github.com/Tanya-garg10/VoiceTwin---AI-Communication-Twin/issues
- Firebase Support: https://firebase.google.com/support
- Agora Support: https://docs.agora.io/en/Agora%20Platform/faq

---

**Note**: Start with the recommended Option 1 (Vercel + Render) for easiest deployment. Move to other options as your scaling needs grow.
