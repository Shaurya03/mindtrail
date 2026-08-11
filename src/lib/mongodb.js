import mongoose from "mongoose";

const mongo = process.env.MONGODB_URI;

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  } else if (cached.promise) {
    cached.conn = await cached.promise;
    return cached.conn;
  }

  try {
    cached.promise = mongoose.connect(mongo);
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default connectDB;