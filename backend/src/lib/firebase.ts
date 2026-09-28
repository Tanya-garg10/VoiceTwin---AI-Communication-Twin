// @ts-ignore - Firebase admin types have issues with ES modules
const admin = require('firebase-admin')

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID || '',
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || ''
}

export const firebase = serviceAccount.projectId && serviceAccount.privateKey && serviceAccount.clientEmail
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })
  : null

export const auth = firebase ? admin.auth() : null
export const db = firebase ? admin.firestore() : null