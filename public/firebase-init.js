// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

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

// Function to fetch data from backend (Firebase Function)
async function fetchData() {
    try {
        const response = await fetch('/getFirebaseConfig'); // Call your Firebase Function
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Now you have the firebase config data from the backend.
        initializeApp(data.firebaseConfig);
        getAnalytics(initializeApp(data.firebaseConfig));
    } catch (error) {
        console.error('Error fetching Firebase config:', error);
        // Handle the error appropriately (e.g., display a message to the user)
    }
}

// Call the function to fetch data when the page loads
fetchData();
