import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Memory from "../models/Memory.js";

// Fix dotenv path since .env is in the server/ folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));

// Create a new memory
app.post("/memories", async (req, res) => {
    try {
        const { image, creator, title, description, tags, date } = req.body;
        const newMemory = new Memory({ image, creator, title, description, tags, date });
        const savedMemory = await newMemory.save();
        res.status(201).json(savedMemory);
    } catch (err) {
        console.error("Error creating memory:", err);
        res.status(500).json({ message: err.message });
    }
});

// Get all memories
app.get("/memories", async (req, res) => {
    try {
        const memories = await Memory.find().sort({ date: -1 });
        res.json(memories);
    } catch (err) {
        console.error("Error fetching memories:", err);
        res.status(500).json({ message: err.message });
    }
});

// Delete a memory
app.delete("/memories/:id", async (req, res) => {
    try {
        await Memory.findByIdAndDelete(req.params.id);
        res.json({ message: "Memory deleted" });
    } catch (err) {
        console.error("Error deleting memory:", err);
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});