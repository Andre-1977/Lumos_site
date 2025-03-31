const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lumos-survey')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Survey Response Schema
const surveySchema = new mongoose.Schema({
    role: { type: String, required: true },
    experience: { type: String, required: true },
    challenges: [String],
    tech_usage: [String],
    needs: { type: String, required: true },
    email: String,
    createdAt: { type: Date, default: Date.now }
});

const SurveyResponse = mongoose.model('SurveyResponse', surveySchema);

// Routes
app.post('/api/survey', async (req, res) => {
    try {
        const surveyResponse = new SurveyResponse(req.body);
        await surveyResponse.save();
        res.status(201).json({ message: 'Survey response saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving survey response' });
    }
});

app.get('/api/survey', async (req, res) => {
    try {
        const responses = await SurveyResponse.find();
        res.json(responses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching survey responses' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
