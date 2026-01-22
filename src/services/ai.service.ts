import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || '';

export const sendMessageToGemini = async (
    systemPrompt: string,
    userMessage: string,
    history: { role: 'user' | 'model'; parts: string }[]
) => {
    if (!API_KEY) {
        throw new Error('Gemini API Key is not configured');
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: systemPrompt }],
            },
            {
                role: "model",
                parts: [{ text: "Entendido. Actuaré como el asistente virtual basado en ese perfil. ¿En qué puedo ayudarte hoy?" }],
            },
            ...history.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.parts }]
            }))
        ],
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
};
