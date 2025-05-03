document.addEventListener("DOMContentLoaded", () => {
    loadFeedback(); // Load existing feedback when the page loads
});

// Function to Submit Feedback
document.getElementById("feedback-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (!name || !email || !message) {
        alert("All fields are required!");
        return;
    }

    fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById("feedback-form").reset();
        loadFeedback(); // Refresh feedback list
    })
    .catch(error => console.error("Error:", error));
});

// Function to Fetch and Display Feedback
function loadFeedback() {
    fetch("http://localhost:5000/api/feedback")
    .then(response => response.json())
    .then(feedbacks => {
        let feedbackContainer = document.getElementById("feedback-list");
        feedbackContainer.innerHTML = ""; // Clear previous feedback

        feedbacks.forEach(feedback => {
            let feedbackItem = document.createElement("div");
            feedbackItem.classList.add("feedback-item");
            feedbackItem.innerHTML = `
                <h4>${feedback.name}</h4>
                <p>${feedback.message}</p>
                <small>${new Date(feedback.date).toLocaleString()}</small>
            `;
            feedbackContainer.appendChild(feedbackItem);
        });
    })
    .catch(error => console.error("Error fetching feedback:", error));
}
