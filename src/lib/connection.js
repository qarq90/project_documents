import mongoose from "mongoose";

export default async function connection() {
    if (mongoose.connections[0].readyState) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error(error);
        console.log("Failed to connect to MongoDB");
        throw error;
    }

    console.log("MongoDB connection process completed");
}
