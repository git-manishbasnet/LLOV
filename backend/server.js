const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();  // Make sure this is the first line

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://llov-frontend.vercel.app', // Replace with your frontend domain
  methods: 'GET, POST', // Allow only certain methods if needed
  allowedHeaders: 'Content-Type', // Allow specific headers
}));
app.use(express.json());

// Log the Mongo URI to check if it's being read properly
console.log("Mongo URI:", process.env.MONGO_URI);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// Mongoose Schema and Model
const EntrySchema = new mongoose.Schema({
    yourName: { type: String, required: true },
    partnerName: { type: String, required: true },
    percentage: { type: Number, required: true },
});

const Entry = mongoose.model("Entry", EntrySchema);

// API Endpoints
app.post("/api/entries", async (req, res) => {
    try {
      const { yourName, partnerName, percentage } = req.body;
      const newEntry = new Entry({ yourName, partnerName, percentage });
      await newEntry.save();
      res.status(201).json(newEntry);
    } catch (error) {
      console.error("Error saving entry:", error); 
      res.status(500).json({ message: "Error saving entry", error });
    }
});

app.get("/api/entries", async (req, res) => {
    try {
      const entries = await Entry.find();
      res.status(200).json(entries);
    } catch (error) {
      console.error("Error fetching entries:", error); 
      res.status(500).json({ message: "Error fetching entries", error });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
