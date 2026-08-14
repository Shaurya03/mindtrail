import mongoose from "mongoose";

const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },

    tags: {
      type: [String],
      default: []
    }
  },

  {
    timestamps: true
  }
);

export default mongoose.models.Note || mongoose.model("Note", noteSchema);