import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
    throw new Error("Please define mongodb uri enviornment variable");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to database!`);
    } catch (error) {
        console.error("Error connecting to db", error);
        // exit(1);
    }
}

export default connectToDatabase;