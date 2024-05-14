const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
import { extractJson } from '../helpers';
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });


export const generateResult = async (input: String, level: String) => {
    try {
        const prompt = process.env.MODEL_PROMPT + input + ', Level: ' + level;
        const result = await model.generateContent(prompt);
        let text = result.response.text();
        return extractJson(text);
    } catch (error) {
        if (error.message.includes('SAFETY')) {
            return { error: 'Response blocked due to Safety Reasons.' };
        }
    }
}