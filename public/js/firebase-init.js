import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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

export { app, db, analytics };
