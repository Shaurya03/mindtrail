import { GoogleGenAI } from "@google/genai";

const RELEVANCE_THRESHOLD = 0.55;

let ai = null;

async function generateAnswer(matches, question) {
  const relevantMatches = matches.filter(match => match.score > RELEVANCE_THRESHOLD);

  if (relevantMatches.length === 0) {
    return "I don't have any relevant notes to answer that question.";
  }

  const chunkTexts = relevantMatches.map(match => match.metadata.chunkText);
  const contextString = chunkTexts.join("\n\n");

  const prompt = `You will get questions from the notes the user created. Answer only from the given note's context
  only. Never create answers from information not provided in the notes. If there is no information about the answer
  then admit that no relevant answer can be found.
  Context: ${contextString}
  Question: ${question}`;

  if (ai === null) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  const generate = await ai.models.generateContent({ model: "gemini-3.6-flash", contents: prompt });
  return generate.text;
};

export default generateAnswer;