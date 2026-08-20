import chunkText from "./chunkText";
import { GoogleGenAI } from "@google/genai";
import { Pinecone } from "@pinecone-database/pinecone";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index({ name: "mindtrail-notes" });

async function embedAndUpsertNote(noteId, userId, content) {

  const chunks = chunkText(content);
  const records = [];

  for (const [i, chunk] of chunks.entries()) {
    const embed = await ai.models.embedContent({ model: "gemini-embedding-001", contents: chunk });
    const vector = embed.embeddings[0].values;

    const eachChunk = {
      id: `${noteId}-chunk-${i}`,
      values: vector,
      metadata: { noteId, userId, chunkText: chunk }
    };

    records.push(eachChunk);
  };

  await index.upsert({ records });
};

export default embedAndUpsertNote;