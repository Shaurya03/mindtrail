import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {

  const embed = await ai.models.embedContent({ model: "gemini-embedding-001", contents: "This is Mindtrail. A AI second brain notes app" });
  console.log(embed.embeddings[0].values.length);
};

main();