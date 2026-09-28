import admin from 'firebase-admin'

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID || '',
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || ''
}

// @ts-ignore - Firebase admin types have issues with ES modules
export const firebase = serviceAccount.projectId && serviceAccount.privateKey && serviceAccount.clientEmail
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })
  : null

// @ts-ignore
export const auth = firebase ? admin.auth() : null
// @ts-ignore
export const db = firebase ? admin.firestore() : null