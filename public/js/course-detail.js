// course-detail.js
import { initializeApp, getApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import { getFirestore, doc, getDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';
import { app, db } from './firebase-init.js'; // Keep this relative import

// Optional: Keep the app initialization check
try {
    const initializedApp = getApp();
    console.log("Firebase App is initialized:", initializedApp.name);
} catch (e) {
    console.error("Firebase App initialization check failed:", e.message);
}

const getCourseId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');
    console.log("Course ID from URL:", courseId);
    return courseId;
};

const fetchCourseDetails = async (courseId) => {
    try {
        const courseRef = doc(db, 'courses', courseId);
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
            const courseData = courseSnap.data();
            return courseData;
        } else {
            console.log("No such course!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching course details:", error);
        return null;
    }
};

const fetchTeacherReviews = async (courseId) => {
    try {
        const db = getFirestore(app);
        const courseRef = doc(db, 'courses', courseId);
        const teachersCollection = collection(courseRef, 'Teachers');
        const teachersSnapshot = await getDocs(teachersCollection);
        let teacherReviews = [];

        for (const teacherDoc of teachersSnapshot.docs) {
            const teacherName = teacherDoc.id; // The teacher's name is the document ID
            const reviewsCollection = collection(teacherDoc.ref, 'reviews');
            const reviewsSnapshot = await getDocs(reviewsCollection);
            const reviews = reviewsSnapshot.docs.map(reviewDoc => reviewDoc.data());
            teacherReviews.push({ teacherName, reviews });
        }
        return teacherReviews;
    } catch (error) {
        console.error("Error fetching teacher reviews:", error);
        return [];
    }
};

const displayCourseDetails = (courseData) => {
    if (courseData) {
        document.getElementById('course-title').textContent = courseData.courseName;
        document.getElementById('course-code').textContent = "Course Code: " + courseData.courseCode;
        // document.getElementById('course-description').textContent = courseData.description;
    } else {
         document.getElementById('course-details').textContent = "Course not found";
    }
};

const displayTeacherReviews = (teacherReviews) => {
    const reviewsContainer = document.getElementById('teacher-reviews');
    if (teacherReviews && teacherReviews.length > 0) {
        teacherReviews.forEach(teacher => {
            const teacherDiv = document.createElement('div');
            teacherDiv.classList.add('teacher-review');
            teacherDiv.innerHTML = `<h3>${teacher.teacherName}</h3>`;
            // const reviewsList = document.createElement('ul');
            // teacher.reviews.forEach(review => {
            //     const reviewItem = document.createElement('li');
            //     reviewItem.textContent = review.comment;
            //     reviewsList.appendChild(reviewItem);
            // });
            // teacherDiv.appendChild(reviewsList);
            reviewsContainer.appendChild(teacherDiv);
        });
    } else {
        reviewsContainer.textContent = "No reviews found for this course.";
    }
};

const init = async () => {
    const courseId = getCourseId();
    if (courseId) {
        const courseData = await fetchCourseDetails(courseId);
        displayCourseDetails(courseData);

        const teacherReviews = await fetchTeacherReviews(courseId);
        displayTeacherReviews(teacherReviews);
    } else {
        document.getElementById('course-details').textContent = "No course ID provided.";
    }
};

init();
console.log("course-detail.js loading")
