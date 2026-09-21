import verifyAuth from "@/lib/auth";
import retrieveRelevantChunks from "@/lib/retrieveChunks";
import generateAnswer from "@/lib/generateAnswer";

async function handleChat(req, res) {

  const auth = verifyAuth(req);

  const { valid, userId } = auth;

  if (valid === false) {
    return res.status(401).json({ error: "Authentication requires" });
  }

  try {

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question does not exist" });
    }

    const retrieve = await retrieveRelevantChunks(userId, question);
    const generate = await generateAnswer(retrieve, question);

    return res.status(200).json({ answer: generate });

  } catch (error) {
    return res.status(500).json({ error: "Failed to generate answer. Please try again" });
  }
};

function handler(req, res) {

  if (req.method === "POST") {
    return handleChat(req, res);
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;