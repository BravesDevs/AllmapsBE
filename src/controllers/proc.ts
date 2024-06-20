import { generateResult } from "../services/proc";
import { Request, Response } from "express";
export const generateMapController = async (req: Request, res: Response) => {
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
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const testController = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Test successful' });
};