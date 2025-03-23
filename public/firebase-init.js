// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Import Firebase Authentication and getAuth
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Import FirebaseUI
import * as firebaseui from 'https://cdn.firebase.com/libs/firebaseui/4.8.1/firebaseui.js';
import 'https://cdn.firebase.com/libs/firebaseui/4.8.1/firebaseui.css'; // Import FirebaseUI CSS (or include it in your HTML)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVhIJ_abp8jQJi8QAtsnvg-WKkPbNlPqI",
  authDomain: "project-polaris-statefarm.firebaseapp.com",
  projectId: "project-polaris-statefarm",
  storageBucket: "project-polaris-statefarm.firebasestorage.app",
  messagingSenderId: "918316280295",
  appId: "1:918316280295:web:1d5cd9584ad5f1b6f63542",
  measurementId: "G-NFCNZMLTV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(auth);

// FirebaseUI configuration
const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID // Use the GoogleAuthProvider
  ],
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      // Handle successful sign-in
      console.log('User signed in:', authResult.user);
      return true; // Return true to redirect back to your app
    },
    uiShown: () => {
      // Hide the loader
      document.getElementById('loader')?.style.display = 'none'; // Use optional chaining
    }
  },
  tosUrl: '<your-tos-url>', // Replace with your actual ToS URL
  privacyPolicyUrl: '<your-privacy-policy-url>' // Replace with your actual privacy policy URL
};

// Start FirebaseUI (call this function when you want the sign-in UI to appear)
function startFirebaseUI() {
  ui.start('#firebaseui-auth-container', uiConfig);
}

export { app, db, analytics, auth, startFirebaseUI };
