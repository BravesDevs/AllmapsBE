import { generateResult } from "../services/proc";

export const generateMapController = async (req, res) => {
    try {
        const { text, level } = req.body;
        if (!text || !level) {
            res.status(400).json({ error: 'Fields are required.' });
            return;
        }
        const result = await generateResult(text, level);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};