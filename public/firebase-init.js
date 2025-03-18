// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEquBjEhGu4rLKj4pSUSVRa2OYQ964IQs",
    authDomain: "projectpolaris-1d511.firebaseapp.com",
    projectId: "projectpolaris-1d511",
    storageBucket: "projectpolaris-1d511.firebasestorage.app",
    messagingSenderId: "60852178591",
    appId: "1:60852178591:web:564daf44ec41fcc0c61caa",
    measurementId: "G-DDVMXFKNZN"
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
