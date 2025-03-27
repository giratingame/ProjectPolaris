import { db } from './firebase-init.js'; // Import your Firebase database instance
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', async () => {
        const studentId = document.getElementById('student-id').value;
        const rigorScore = parseInt(document.getElementById('rigor-score').value);
        const workloadScore = parseInt(document.getElementById('workload-score').value);
        const involvementScore = parseInt(document.getElementById('involvement-score').value);
        const homeworkScore = parseInt(document.getElementById('homework-score').value);
        const comment = document.getElementById('comment').value;

        // Validate input
        if (!studentId || isNaN(rigorScore) || isNaN(workloadScore) || isNaN(involvementScore) || isNaN(homeworkScore) || !comment) {
            alert('Please fill in all fields.');
            return;
        }

        if (rigorScore < 1 || rigorScore > 5 || workloadScore < 1 || workloadScore > 5 || involvementScore < 1 || involvementScore > 5 || homeworkScore < 1 || homeworkScore > 5) {
            alert('Scores must be between 1 and 5.');
            return;
        }

        try {
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "reviews"), {
                studentId: studentId,
                rigorScore: rigorScore,
                workloadScore: workloadScore,
                involvementScore: involvementScore,
                homeworkScore: homeworkScore,
                comment: comment,
                timestamp: new Date() // Add a timestamp
            });
            console.log("Document written with ID: ", docRef.id);
            alert('Review submitted successfully!');
            // Optionally, redirect the user or clear the form
            window.location.href = 'course-detail.html'; // Or whatever page you want them back on.
        } catch (e) {
            console.error("Error adding document: ", e);
            alert('Error submitting review. Please try again.');
        }
    });
});
