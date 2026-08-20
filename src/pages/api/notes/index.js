import connectDB from "@/lib/mongodb";
import verifyAuth from "@/lib/auth";
import Note from "@/models/note";
import embedAndUpsertNote from "@/lib/embedNote";

async function createNote(req, res) {

  const auth = verifyAuth(req);

  const { valid, userId } = auth;

  if (valid === false) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {

    await connectDB();

    const {
      title,
      content,
      tags
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is missing" });
    }

    if (!content) {
      return res.status(400).json({ error: "Content is missing" });
    }

    const note = await Note.create({ userId, title, content, tags });

    try {
      await embedAndUpsertNote(note._id, userId, content);
    } catch (error) {
      console.error(`Embedding failed for note ${note._id}:`, error);
    }

    return res.status(201).json({ note });

  } catch (error) {
    return res.status(500).json({ error: "Failed to create note. Please try again" });
  }
};

async function getNotes(req, res) {

  const auth = verifyAuth(req);

  const { valid, userId } = auth;

  if (valid === false) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {

    await connectDB();

    const notes = await Note.find({ userId });

    return res.status(200).json({ notes });

  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch notes. Please try again" });
  }

};

function handler(req, res) {

  if (req.method === "POST") {
    return createNote(req, res);
  }

  if (req.method === "GET") {
    return getNotes(req, res);
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;