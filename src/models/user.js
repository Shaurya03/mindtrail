import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  passwordHash: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.models.User || mongoose.model("User", userSchema);