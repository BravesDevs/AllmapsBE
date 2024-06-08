const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
import { extractJson } from '../helpers';
import { getSecretSync, getSecret } from '../helpers';
// require('dotenv').config();



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });


export const generateResult = async (input: String, level: String) => {
    try {

        const MODEL_PROMPT = await getSecret().then((response) => response.MODEL_PROMPT);
        const GENERATION_CONFIG = await getSecret().then((response) => response.GENERATION_CONFIG);
        const SAFETY_SETTINGS = await getSecret().then((response) => response.SAFETY_SETTINGS);

        const prompt = MODEL_PROMPT + input + ', Level: ' + level;
        const result = await model.generateContent(prompt, GENERATION_CONFIG, SAFETY_SETTINGS);

        let text = await result.response.text();
        return await extractJson(text);

    } catch (error) {
        if (error.message.includes('SAFETY')) {
            return { error: 'Response blocked due to Safety Reasons.' };
        }
        else
            return { error: error.message };
    }
}