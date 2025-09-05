import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getAISuggestion = async (req, res) => {
  const { prompt } = req.body;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    res.send({ response });
  } catch (error) {
    console.error("Error calling Gemini API:", error.message);
    res.status(500).send({ error: "Failed to fetch response from Gemini" });
  }
};
