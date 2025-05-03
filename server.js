const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const FILE_PATH = "feedback.json";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Default route to check if server is running
app.get("/", (req, res) => {
    res.send("🚀 Server is running! Use /api/feedback to submit feedback.");
});

// ✅ API to handle feedback submission
app.post("/api/feedback", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        let feedbacks = [];

        // Check if feedback.json exists
        if (fs.existsSync(FILE_PATH)) {
            const data = fs.readFileSync(FILE_PATH, "utf8");
            if (data) {
                feedbacks = JSON.parse(data);
            }
        }

        // Add new feedback
        const newFeedback = { name, email, message, date: new Date() };
        feedbacks.push(newFeedback);

        // Save to JSON file
        fs.writeFileSync(FILE_PATH, JSON.stringify(feedbacks, null, 2));

        res.status(201).json({ message: "✅ Feedback submitted successfully!" });
    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ error: "❌ Internal Server Error" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
