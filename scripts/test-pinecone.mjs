import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const index = pc.index("mindtrail-notes");

async function main() {

  const vector = Array.from({ length: 3072 }, () => Math.random());

  await index.upsert({ records: [{ id: "test-1", values: vector, metadata: { note: "hello pinecone" } }] });

  console.log("Vector upserted");

  const result = await index.query({ vector: vector, topK: 1, includeMetadata: true });

  console.log(result);
};

main();