import connectDB from "@/lib/mongodb";
import verifyAuth from "@/lib/auth";
import Note from "@/models/note";
import mongoose from "mongoose";

async function getNote(req, res) {

  const auth = verifyAuth(req);

  const { valid, userId } = auth;

  if (valid === false) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const { id } = req.query;

  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) {
    return res.status(400).json({ error: "Invalid note ID" });
  }

  try {
    await connectDB();

    const note = await Note.findOne({ _id: id, userId });

    if (note === null) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({ note });

  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch note. Please try again" });
  }
};

async function updateNote(req, res) {

  const auth = verifyAuth(req);

  const { valid, userId } = auth;

  if (valid === false) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const { id } = req.query;

  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) {
    return res.status(400).json({ error: "Invalid note ID" });
  }

  const { title, content, tags } = req.body;

  const updateData = {};

  if (title) {
    updateData.title = title;
  }

  if (content) {
    updateData.content = content;
  }

  if (tags) {
    updateData.tags = tags;
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "No valid fields provided to update" });
  }

  try {
    await connectDB();

    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );

    if (note === null) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({ note });

  } catch (error) {
    return res.status(500).json({ error: "Failed to update note. Please try again" });
  }
};

function handler(req, res) {

  if (req.method === "GET") {
    return getNote(req, res);
  }

  if (req.method === "PATCH") {
    return updateNote(req, res);
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;