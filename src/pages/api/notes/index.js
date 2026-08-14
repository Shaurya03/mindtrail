import connectDB from "@/lib/mongodb";
import verifyAuth from "@/lib/auth";
import Note from "@/models/note";

async function createNote(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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

    const note = await Note.create({ userId, title, content, tags })

    return res.status(201).json({ note });

  } catch (error) {
    return res.status(500).json({ error: "Failed to create note. Please try again" });
  }
};

export default createNote;