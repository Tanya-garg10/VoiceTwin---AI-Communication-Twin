# Environment Variables Guide - Kahan Se Mileinge

Yeh guide batayegi ki har environment variable kahan se mileinge aur kaise configure karna hai.

## 1. NODE_ENV (Self-Generated)

**Kya hai:** Environment type (development/production)

**Kahan se milega:** Khud set karna hai

**Value:** `production` (for deployment)

```bash
NODE_ENV=production
```

---

## 2. PORT (Self-Configured)

**Kya hai:** Server port number

**Kahan se milega:** Khud set karna hai

**Value:** `3000` (default for Render)

```bash
PORT=3000
```

---

## 3. Firebase Credentials

### 3.1 FIREBASE_PROJECT_ID

**Kahan se milega:** Firebase Console

**Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (ya create new project)
3. Click on ⚙️ (Project Settings)
4. General tab mein "Project ID" copy karein

**Example:** `voicetwin-app-12345`

### 3.2 FIREBASE_PRIVATE_KEY

**Kahan se milega:** Firebase Service Account

**Steps:**
1. Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. JSON file download hogi
4. JSON file open karein
5. `private_key` field copy karein

**Important:**
- Full key copy karein including `-----BEGIN PRIVATE KEY-----` aur `-----END PRIVATE KEY-----`
- New lines ko `\n` se replace karein environment variable mein

**Example Format:**
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
(more lines)
-----END PRIVATE KEY-----
```

### 3.3 FIREBASE_CLIENT_EMAIL

**Kahan se milega:** Firebase Service Account (same JSON file)

**Steps:**
1. Same JSON file se `client_email` field copy karein

**Example:** `firebase-adminsdk-xyz@voicetwin-app-12345.iam.gserviceaccount.com`

### 3.4 FIREBASE_DATABASE_URL

**Kahan se milega:** Firebase Console

**Steps:**
1. Firebase Console → Firestore Database
2. URL copy karein from browser address bar
3. Ya format: `https://voicetwin-app-12345.firebaseio.com`

**Example:** `https://voicetwin-app-12345-default-rtdb.firebaseio.com`

---

## 4. Agora Credentials

### 4.1 AGORA_APP_ID

**Kahan se milega:** Agora Console

**Steps:**
1. Go to [Agora Console](https://console.agora.io)
2. Sign up/Login
3. Create new project ya existing project select karein
4. Project overview mein "App ID" copy karein

**Example:** `1234567890abcdef1234567890abcdef`

### 4.2 AGORA_APP_CERTIFICATE

**Kahan se milega:** Agora Console

**Steps:**
1. Agora Console → Your Project
2. "Certificate" tab mein jayein
3. "App Certificate" generate karein (agar nahi hai)
4. Certificate copy karein

**Important:**
- Certificate sirf ek baar show hota hai
- Secure location mein save karein
- Agar lost ho gaya to regenerate karna padega

**Example:** `abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890`

---

## 5. AUTH_SECRET (Self-Generated)

**Kya hai:** Secret key for JWT authentication

**Kahan se milega:** Khud generate karna hai

**How to Generate:**

**Option 1: Using OpenSSL (Recommended)**
```bash
openssl rand -base64 32
```

**Option 2: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 3: Online Generator**
- Go to: https://www.uuidgenerator.net/api/guid
- Use the generated UUID

**Example:** `dGhpcyBpcyBhIHZlcnkgbG9uZyByYW5kb20gc2VjcmV0IHN0cmluZyBmb3Igand0IGF1dGhlbnRpY2F0aW9u`

---

## 6. Frontend Environment Variables (Vite)

### 6.1 VITE_API_URL

**Kya hai:** Backend API URL

**Kahan se milega:** Render deployment ke baad

**Steps:**
1. Backend deploy karein Render pe
2. Render se milne wali URL copy karein
3. Vercel mein environment variable mein paste karein

**Example:** `https://voicetwin-backend.onrender.com`

### 6.2 VITE_AGORA_APP_ID

**Kahan se milega:** Same as AGORA_APP_ID (from Agora Console)

### 6.3 VITE_FIREBASE_API_KEY

**Kahan se milega:** Firebase Console

**Steps:**
1. Firebase Console → Project Settings → General
2. Scroll down to "Your apps" section
3. Web app select karein ya create karein
4. "API Key" copy karein

**Example:** `AIzaSyBCdefGHIjklMNOpqrsTUVwxyzABC123`

### 6.4 VITE_FIREBASE_AUTH_DOMAIN

**Kahan se milega:** Firebase Console

**Steps:**
1. Firebase Console → Project Settings → General
2. "Your apps" → Web app
3. "Auth domain" copy karein

**Example:** `voicetwin-app-12345.firebaseapp.com`

### 6.5 VITE_FIREBASE_PROJECT_ID

**Kahan se milega:** Same as FIREBASE_PROJECT_ID

### 6.6 VITE_FIREBASE_STORAGE_BUCKET

**Kahan se milega:** Firebase Console

**Steps:**
1. Firebase Console → Storage
2. Storage bucket name copy karein

**Example:** `voicetwin-app-12345.appspot.com`

### 6.7 VITE_FIREBASE_MESSAGING_SENDER_ID

**Kahan se milega:** Firebase Console

**Steps:**
1. Firebase Console → Project Settings → General
2. "Your apps" → Web app
3. "Messaging sender ID" copy karein

**Example:** `123456789012`

### 6.8 VITE_FIREBASE_APP_ID

**Kahan se milega:** Firebase Console

**Steps:**
1. Firebase Console → Project Settings → General
2. "Your apps" → Web app
3. "App ID" copy karein

**Example:** `1:123456789012:web:abcdef123456`

### 6.9 VITE_DEMO_MODE

**Kya hai:** Demo mode enable/disable

**Kahan se milega:** Khud set karna hai

**Value:** `false` (for production)

```bash
VITE_DEMO_MODE=false
```

---

## Complete Setup Flow

### Step 1: Firebase Setup
1. [Firebase Console](https://console.firebase.google.com) mein jayein
2. New project create karein
3. Authentication enable karein (Email/Password)
4. Firestore Database create karein
5. Storage enable karein (optional)
6. Service account key generate karein
7. Web app create karein
8. Sab credentials note karein

### Step 2: Agora Setup
1. [Agora Console](https://console.agora.io) mein jayein
2. Account create karein
3. New project create karein
4. App ID aur Certificate note karein

### Step 3: Generate AUTH_SECRET
```bash
openssl rand -base64 32
```

### Step 4: Backend Deployment (Render)
1. Backend credentials add karein:
   - FIREBASE_PROJECT_ID
   - FIREBASE_PRIVATE_KEY
   - FIREBASE_CLIENT_EMAIL
   - FIREBASE_DATABASE_URL
   - AGORA_APP_ID
   - AGORA_APP_CERTIFICATE
   - AUTH_SECRET
   - NODE_ENV=production
   - PORT=3000

2. Deploy karein
3. Backend URL copy karein

### Step 5: Frontend Deployment (Vercel)
1. Frontend credentials add karein:
   - VITE_API_URL (backend URL)
   - VITE_AGORA_APP_ID
   - VITE_FIREBASE_API_KEY
   - VITE_FIREBASE_AUTH_DOMAIN
   - VITE_FIREBASE_PROJECT_ID
   - VITE_FIREBASE_STORAGE_BUCKET
   - VITE_FIREBASE_MESSAGING_SENDER_ID
   - VITE_FIREBASE_APP_ID
   - VITE_DEMO_MODE=false

2. Deploy karein

---

## Quick Reference Card

| Variable | Source | Platform |
|----------|--------|----------|
| NODE_ENV | Self-set | - |
| PORT | Self-set | - |
| FIREBASE_PROJECT_ID | Firebase Console | Firebase |
| FIREBASE_PRIVATE_KEY | Firebase Service Account | Firebase |
| FIREBASE_CLIENT_EMAIL | Firebase Service Account | Firebase |
| FIREBASE_DATABASE_URL | Firebase Console | Firebase |
| AGORA_APP_ID | Agora Console | Agora |
| AGORA_APP_CERTIFICATE | Agora Console | Agora |
| AUTH_SECRET | Self-generated | - |
| VITE_API_URL | Render URL | Render |
| VITE_AGORA_APP_ID | Agora Console | Agora |
| VITE_FIREBASE_API_KEY | Firebase Console | Firebase |
| VITE_FIREBASE_AUTH_DOMAIN | Firebase Console | Firebase |
| VITE_FIREBASE_PROJECT_ID | Firebase Console | Firebase |
| VITE_FIREBASE_STORAGE_BUCKET | Firebase Console | Firebase |
| VITE_FIREBASE_MESSAGING_SENDER_ID | Firebase Console | Firebase |
| VITE_FIREBASE_APP_ID | Firebase Console | Firebase |
| VITE_DEMO_MODE | Self-set | - |

---

## Important Security Notes

⚠️ **Never commit** `.env` file to git
⚠️ **Never share** your private keys or certificates
⚠️ **Use different** secrets for development and production
⚠️ **Rotate secrets** regularly for security
⚠️ **Limit access** to Firebase and Agora consoles
⚠️ **Enable 2FA** on all your accounts

---

## Troubleshooting

### Firebase Private Key Issues
- Ensure you copied the entire key including BEGIN/END lines
- Replace newlines with `\n` in environment variables
- Check that the service account has proper permissions

### Agora Certificate Issues
- Certificate is only shown once - save it securely
- If lost, you need to regenerate it
- Ensure your Agora project is active

### Auth Secret Issues
- Use a long, random string (32+ bytes recommended)
- Don't use simple words or predictable patterns
- Generate fresh secret for production

### Backend URL Issues
- Ensure backend is deployed before setting frontend URL
- Use HTTPS URLs (both Vercel and Render provide this)
- Test the backend URL in browser before adding to frontend

---

## Helpful Links

- **Firebase Console**: https://console.firebase.google.com
- **Firebase Setup Guide**: https://firebase.google.com/docs/web/setup
- **Agora Console**: https://console.agora.io
- **Agora Documentation**: https://docs.agora.io
- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

Agar aapko koi specific credential lene mein problem aa rahi hai, to mujhe bataiye, main detailed steps de sakta hoon!
