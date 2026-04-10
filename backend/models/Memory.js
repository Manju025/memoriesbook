import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
    image: String,
    creator: String,
    title: String,
    description: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Memory", memorySchema);