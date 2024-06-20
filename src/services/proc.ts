const {
    GoogleGenerativeAI,
} = require("@google/generative-ai");
import { extractJson } from '../helpers';
require('dotenv').config();



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });


export const generateResult = async (input: String, level: String) => {
    try {

        const MODEL_PROMPT = process.env.MODEL_PROMPT;
        const GENERATION_CONFIG = process.env.GENERATION_CONFIG;
        const SAFETY_SETTINGS = process.env.SAFETY_SETTINGS;

        const prompt = MODEL_PROMPT + input + ', Level: ' + level;
        const result = await model.generateContent(prompt, GENERATION_CONFIG, SAFETY_SETTINGS);

        let text = result.response.text();
        return await extractJson(text);

    } catch (error) {
        if (error.message.includes('SAFETY')) {
            return { error: 'Response blocked due to Safety Reasons.' };
        }
        else
            return { error: error.message };
    }
}