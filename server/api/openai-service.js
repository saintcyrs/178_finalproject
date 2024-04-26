import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: API_KEY,
  organization: "org-fGBenTuDRFiSZQq06mYd2VLz",
  project: "proj_6zcGa3rBbVGa2AINiBREDWyo",
});

async function analyzeContent(text) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: text },
      ],
      model: "gpt-3.5-turbo",
    });
    return completion.data.choices[0].message.content;
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    throw error;
  }
}

export { analyzeContent };
