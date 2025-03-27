const displayTeacherReviews = (teacherReviews) => {
    const reviewsContainer = document.getElementById('teacher-reviews');
    reviewsContainer.innerHTML = '';

    if (teacherReviews && teacherReviews.length > 0) {
        console.log("Teacher Reviews:", teacherReviews); // Debugging

        teacherReviews.forEach(teacher => {
            const teacherDiv = document.createElement('div');
            teacherDiv.classList.add('teacher-review');
            teacherDiv.innerHTML = `<h3>${teacher.teacherName}</h3>`;

            const rigorDiv = document.createElement('div');
            rigorDiv.classList.add('review-category');
            const workloadDiv = document.createElement('div');
            workloadDiv.classList.add('review-category');
            const involvementDiv = document.createElement('div');
            involvementDiv.classList.add('review-category');
            const homeworkDiv = document.createElement('div');
            homeworkDiv.classList.add('review-category');

            rigorDiv.innerHTML = `<span class="detail-label">Subject Rigor:</span> <span id="rigor-score-${teacher.teacherName}"></span><div class="review-bar-container"><div id="rigor-bar-${teacher.teacherName}" class="review-bar"></div></div>`;
            workloadDiv.innerHTML = `<span class="detail-label">Workload:</span> <span id="workload-score-${teacher.teacherName}"></span><div class="review-bar-container"><div id="workload-bar-${teacher.teacherName}" class="review-bar"></div></div>`;
            involvementDiv.innerHTML = `<span class="detail-label">Teacher Involvement:</span> <span id="involvement-score-${teacher.teacherName}"></span><div class="review-bar-container"><div id="involvement-bar-${teacher.teacherName}" class="review-bar"></div></div>`;
            homeworkDiv.innerHTML = `<span class="detail-label">Homework:</span> <span id="homework-score-${teacher.teacherName}"></span><div class="review-bar-container"><div id="homework-bar-${teacher.teacherName}" class="review-bar"></div></div>`;

            teacherDiv.appendChild(rigorDiv);
            teacherDiv.appendChild(workloadDiv);
            teacherDiv.appendChild(involvementDiv);
            teacherDiv.appendChild(homeworkDiv);

            reviewsContainer.appendChild(teacherDiv);

            const calculateAverage = (ratings) => {
                if (ratings.length === 0) return 0;
                const sum = ratings.reduce((acc, curr) => acc + curr, 0);
                return sum / ratings.length;
            };

            const teacherRatings = {
                subjectRigor: teacher.reviews.map(r => r.subjectRigor).filter(r => r !== undefined),
                workload: teacher.reviews.map(r => r.workload).filter(r => r !== undefined),
                teacherInvolvement: teacher.reviews.map(r => r.teacherInvolvement).filter(r => r !== undefined),
                homework: teacher.reviews.map(r => r.homework).filter(r => r !== undefined)
            };

            console.log("Teacher Ratings:", teacherRatings); // Debugging

            const averageRatings = {
                subjectRigor: calculateAverage(teacherRatings.subjectRigor),
                workload: calculateAverage(teacherRatings.workload),
                teacherInvolvement: calculateAverage(teacherRatings.teacherInvolvement),
                homework: calculateAverage(teacherRatings.homework)
            };

            console.log("Average Ratings:", averageRatings); // Debugging

            const updateBar = (barId, scoreId, score, maxScore = 5) => {
                const bar = document.getElementById(barId);
                const scoreSpan = document.getElementById(scoreId);
                if (bar && scoreSpan) {
                    const average = parseFloat(score.toFixed(1));
                    scoreSpan.textContent = isNaN(average) ? '' : average;
                    const percentage = (average / maxScore) * 100;
                    bar.style.width = `${isNaN(percentage) ? 0 : percentage}%`;
                    console.log("Updating bar:", barId, "score:", average); // Debugging
                }
            };
            updateBar(`rigor-bar-${teacher.teacherName}`, `rigor-score-${teacher.teacherName}`, averageRatings.subjectRigor);
            updateBar(`workload-bar-${teacher.teacherName}`, `workload-score-${teacher.teacherName}`, averageRatings.workload);
            updateBar(`involvement-bar-${teacher.teacherName}`, `involvement-score-${teacher.teacherName}`, averageRatings.teacherInvolvement);
            updateBar(`homework-bar-${teacher.teacherName}`, `homework-score-${teacher.teacherName}`, averageRatings.homework);

            const reviewsList = document.createElement('ul');
            teacher.reviews.forEach(review => {
                const reviewItem = document.createElement('li');
                reviewItem.textContent = `Comment: ${review.comment || 'No comment'}`;
                reviewsList.appendChild(reviewItem);
            });
            teacherDiv.appendChild(reviewsList);
        });

    } else {
        reviewsContainer.textContent = "No reviews found for this course.";
    }
};
