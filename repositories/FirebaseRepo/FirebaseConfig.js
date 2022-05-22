import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import firebase from 'firebase/compat/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: String(process.env.NEXT_PUBLIC_FIREBASE_API),
  appId: String(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  authDomain: String(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  databaseURL: String(process.env.NEXT_PUBLIC_FIREBASE_DB_URL),
  messagingSenderId: String(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  projectId: String(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
};

export default firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const signOut = () => auth.signOut();
const db = firebase.firestore();
const storage = firebase.storage();
const fieldValue = firebase.firestore.FieldValue;
const { GithubAuthProvider, GoogleAuthProvider } = firebase.auth;

export { auth, db, fieldValue, GithubAuthProvider, GoogleAuthProvider, signOut, storage };
