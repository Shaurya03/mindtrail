import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import retrieveRelevantChunks from "../src/lib/retrieveChunks.js";

const userId = "6a7f03e61285ce4fa8db09a8";
const question = "why did we not use Postgres for this project";

async function main() {
  const result = await retrieveRelevantChunks(userId, question);
  console.log(result);
};

main();
