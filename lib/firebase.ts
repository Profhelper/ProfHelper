import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDzVKdAWlRj3cFhz_qtMbYkAS6co-mE8mE",
  authDomain: "profhelper-767fb.firebaseapp.com",
  projectId: "profhelper-767fb",
  storageBucket: "profhelper-767fb.firebasestorage.app",
  messagingSenderId: "535869961565",
  appId: "1:535869961565:web:487c8998c83846af8424b4",
  measurementId: "G-EKW46T5LWY"
}

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize Firestore
export const db = getFirestore(app)

export default app
