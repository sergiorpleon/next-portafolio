import { GoogleGenerativeAI } from "@google/generative-ai";

// Environment variables are read inside functions to allow for easier testing and dynamic configuration


export const sendMessageToAI = async (
    systemPrompt: string,
    userMessage: string,
    history: { role: 'user' | 'model'; parts: string }[]
) => {
    const AI_PROVIDER = process.env.AI_PROVIDER || 'gemini';
    if (AI_PROVIDER === 'groq') {
        return sendMessageToGroq(systemPrompt, userMessage, history);
    }
    return sendMessageToGemini(systemPrompt, userMessage, history);
};

const sendMessageToGemini = async (
    systemPrompt: string,
    userMessage: string,
    history: { role: 'user' | 'model'; parts: string }[]
) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
    const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_key_here') {
        throw new Error('Gemini API Key is not configured properly');
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

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

const sendMessageToGroq = async (
    systemPrompt: string,
    userMessage: string,
    history: { role: 'user' | 'model'; parts: string }[]
) => {
    const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.IA_API_KEY || '';
    const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    if (!GROQ_API_KEY) {
        throw new Error('Groq API Key is not configured');
    }

    const messages = [
        { role: "system", content: systemPrompt },
        ...history.map(msg => ({
            role: msg.role === 'model' ? 'assistant' : 'user',
            content: msg.parts
        })),
        { role: "user", content: userMessage }
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: GROQ_MODEL,
            messages: messages
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to fetch from Groq');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
};
