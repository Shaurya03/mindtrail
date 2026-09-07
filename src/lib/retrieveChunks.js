import { GoogleGenAI } from "@google/genai";
import { Pinecone } from "@pinecone-database/pinecone";

let ai = null;
let pc = null;
let index = null;

async function retrieveRelevantChunks(userId, question) {

  if (ai === null) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  if (pc === null) {
    pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  }

  if (index === null) {
    index = pc.index({ name: "mindtrail-notes" });
  }

  const embed = await ai.models.embedContent({ model: "gemini-embedding-001", contents: question });
  const vector = embed.embeddings[0].values;

  const results = await index.query({
    vector: vector,
    topK: 5,
    filter: { userId: { $eq: userId } },
    includeMetadata: true
  });

  return results.matches;
};

export default retrieveRelevantChunks;