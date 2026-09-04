import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index({ name: "mindtrail-notes" });

async function main() {
  const list = await index.listPaginated({ prefix: "6a86e66bac88e1a0f498da26-chunk-" });
  console.log("Found IDs:", list.vectors.map(v => v.id));

  const ids = list.vectors.map(v => v.id);

  try {
    await index.deleteOne({ id: ids[0] });
    console.log("Delete succeeded");
  } catch (error) {
    console.log("Delete failed. Message:", error.message);
    console.log("Status/details:", error.status, error.cause);
  }
}

main();