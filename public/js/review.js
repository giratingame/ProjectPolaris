// public/js/review.js
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { db } from './firebase-init.js';

async function fetchCourses() {
    const classList = document.getElementById('class-list');
    classList.innerHTML = ''; // Clear existing content

    const querySnapshot = await getDocs(collection(db, "schools", "your_school_id", "courses"));
    querySnapshot.forEach((doc) => {
        const courseData = doc.data();
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item'; // Add a class for styling
        courseItem.textContent = courseData.courseName; // Display course name

        // Add click event listener to show course details (you can implement this later)
        courseItem.addEventListener('click', () => {
            console.log('Course clicked:', courseData.courseName);
            // Implement logic to show course details here
        });

        classList.appendChild(courseItem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchCourses();

    // Back button functionality
    document.getElementById('review-back-button').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});
