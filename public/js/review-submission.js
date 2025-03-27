import { db } from './firebase-init.js';
import { collection, getDocs, doc, setDoc } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const teacherSelect = document.getElementById('teacher-name');

    // Function to populate teacher dropdown
    async function populateTeachers() {
        try {
            // Get the course name from local storage
            const courseName = localStorage.getItem('courseName');

            if (!courseName) {
                console.error("Course name not found in local storage.");
                return; // Exit if course name is missing
            }

            const teachersSnapshot = await getDocs(collection(db, "courses", courseName, "Teachers"));
            teachersSnapshot.forEach((doc) => {
                const teacherName = doc.id;
                const option = document.createElement('option');
                option.value = teacherName;
                option.textContent = teacherName;
                teacherSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    }

    // Call populateTeachers on page load.
    populateTeachers();

    submitButton.addEventListener('click', async () => {
        const studentId = document.getElementById('student-id').value;
        const teacherName = teacherSelect.value;
        const rigorScore = parseInt(document.getElementById('rigor-score').value);
        const workloadScore = parseInt(document.getElementById('workload-score').value);
        const involvementScore = parseInt(document.getElementById('involvement-score').value);
        const homeworkScore = parseInt(document.getElementById('homework-score').value);
        const comment = document.getElementById('comment').value;

        // Get the course name from local storage
        const courseName = localStorage.getItem('courseName');

        // Validation
        if (!studentId || !teacherName || !courseName || isNaN(rigorScore) || isNaN(workloadScore) || isNaN(involvementScore) || isNaN(homeworkScore) || !comment) {
            alert('Please fill in all fields.');
            return;
        }

        if (rigorScore < 1 || rigorScore > 5 || workloadScore < 1 || workloadScore > 5 || involvementScore < 1 || involvementScore > 5 || homeworkScore < 1 || homeworkScore > 5) {
            alert('Scores must be between 1 and 5.');
            return;
        }

        try {
            // Store review in the correct path
            await setDoc(doc(db, "courses", courseName, "Teachers", teacherName, "reviews", studentId), {
                studentId: studentId,
                teacherName: teacherName,
                rigorScore: rigorScore,
                workloadScore: workloadScore,
                involvementScore: involvementScore,
                homeworkScore: homeworkScore,
                comment: comment,
                timestamp: new Date()
            });

            alert('Review submitted successfully!');
            window.location.href = 'course-detail.html'; // Redirect back to course detail page
        } catch (error) {
            console.error("Error submitting review:", error);
            alert('Error submitting review. Please try again.');
        }
    });
});
