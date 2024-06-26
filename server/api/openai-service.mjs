import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: API_KEY,
  organization: "org-fGBenTuDRFiSZQq06mYd2VLz",
  project: "proj_6zcGa3rBbVGa2AINiBREDWyo",
});

export async function analyzeContent(text) {
  try {
    const prompt = `Summarize the content from the following link: ${text}`;
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    throw error;
  }
}
