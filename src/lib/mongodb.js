import mongoose from "mongoose";

const mongo = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(mongo);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default connectDB;