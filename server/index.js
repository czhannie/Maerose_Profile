import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { dbName: 'midtermProjectDB' })
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define the Database Schema & Model for your contact form
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// API Route to handle incoming form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Create a new database entry
    const newContact = new Contact({ name, email, message });
    
    // Save it to MongoDB
    await newContact.save();
    
    // Send a success response back to React
    res.status(201).json({ success: true, message: "Message saved to database!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});

// Start Server
const PORT = globalThis.process?.env?.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});