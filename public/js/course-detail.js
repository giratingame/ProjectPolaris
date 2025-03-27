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
        let courseRatings = { // To store average ratings across all teachers
            subjectRigor: [],
            workload: [],
            teacherInvolvement: [],
            homework: []
        };

        for (const teacherDoc of teachersSnapshot.docs) {
            const teacherName = teacherDoc.id;
            const reviewsCollection = collection(teacherDoc.ref, 'reviews');
            const reviewsSnapshot = await getDocs(reviewsCollection);
            const reviews = reviewsSnapshot.docs.map(reviewDoc => reviewDoc.data());
            teacherReviews.push({ teacherName, reviews });

            reviews.forEach(review => {
                if (review.subjectRigor !== undefined) courseRatings.subjectRigor.push(review.subjectRigor);
                if (review.workload !== undefined) courseRatings.workload.push(review.workload);
                if (review.teacherInvolvement !== undefined) courseRatings.teacherInvolvement.push(review.teacherInvolvement);
                if (review.homework !== undefined) courseRatings.homework.push(review.homework);
            });
        }

        // Calculate average ratings
        const calculateAverage = (ratings) => {
            if (ratings.length === 0) return 0;
            const sum = ratings.reduce((acc, curr) => acc + curr, 0);
            return sum / ratings.length;
        };

        const averageRatings = {
            subjectRigor: calculateAverage(courseRatings.subjectRigor),
            workload: calculateAverage(courseRatings.workload),
            teacherInvolvement: calculateAverage(courseRatings.teacherInvolvement),
            homework: calculateAverage(courseRatings.homework)
        };

        return { teacherReviews, averageRatings }; // Return both
    } catch (error) {
        console.error("Error fetching teacher reviews:", error);
        return { teacherReviews: [], averageRatings: {} };
    }
};

const displayCourseDetails = (courseData) => {
    if (courseData) {
        document.getElementById('course-title').textContent = courseData.courseName;
        document.getElementById('course-code').textContent = "Course Code: " + courseData.courseCode;
        // We're not displaying other course details for now
    } else {
         document.getElementById('course-details').textContent = "Course not found";
    }
};

const displayAverageRatings = (averageRatings) => {
    const updateBar = (barId, scoreId, score, maxScore = 5) => {
        const bar = document.getElementById(barId);
        const scoreSpan = document.getElementById(scoreId);
        if (bar && scoreSpan) {
            const average = parseFloat(score.toFixed(1));
            scoreSpan.textContent = isNaN(average) ? '' : average;
            const percentage = (average / maxScore) * 100;
            bar.style.width = `${isNaN(percentage) ? 0 : percentage}%`;
        }
    };

    updateBar('rigor-bar', 'rigor-score', averageRatings.subjectRigor);
    updateBar('workload-bar', 'workload-score', averageRatings.workload);
    updateBar('involvement-bar', 'involvement-score', averageRatings.teacherInvolvement);
    updateBar('homework-bar', 'homework-score', averageRatings.homework);
};

const displayTeacherReviews = (teacherReviews) => {
    const reviewsContainer = document.getElementById('teacher-reviews');
    reviewsContainer.innerHTML = ''; // Clear previous reviews

    if (teacherReviews && teacherReviews.length > 0) {
        teacherReviews.forEach(teacher => {
            const teacherDiv = document.createElement('div');
            teacherDiv.classList.add('teacher-review');
            teacherDiv.innerHTML = `<h3>${teacher.teacherName}</h3>`;
            const reviewsList = document.createElement('ul');
            teacher.reviews.forEach(review => {
                const reviewItem = document.createElement('li');
                reviewItem.textContent = `Comment: ${review.comment || 'No comment'}`;
                reviewsList.appendChild(reviewItem);
            });
            teacherDiv.appendChild(reviewsList);
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

        const { teacherReviews, averageRatings } = await fetchTeacherReviews(courseId);
        displayTeacherReviews(teacherReviews);
        displayAverageRatings(averageRatings); // Call this to update the bars
    } else {
        document.getElementById('course-details').textContent = "No course ID provided.";
    }
};

init();
console.log("course-detail.js loading");
