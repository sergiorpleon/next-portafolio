import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendMessageToAI } from '@/services/ai.service';

// Mock GoogleGenerativeAI
const mockSendMessage = vi.fn();
const mockStartChat = vi.fn(() => ({
    sendMessage: mockSendMessage
}));
const mockGetGenerativeModel = vi.fn(() => ({
    startChat: mockStartChat
}));

// Mock de GoogleGenerativeAI para simular la API de Gemini sin hacer llamadas reales
vi.mock('@google/generative-ai', () => ({
    GoogleGenerativeAI: class {
        getGenerativeModel = mockGetGenerativeModel;
    }
}));

// Mock de fetch global para simular la API de Groq
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('AI Service', () => {
    const originalEnv = process.env;

    // Configuración inicial antes de cada test
    beforeEach(() => {
        vi.clearAllMocks();
        // Guardamos las variables de entorno originales y reseteamos para cada test
        process.env = { ...originalEnv };
        process.env.GEMINI_API_KEY = 'test-gemini-key';
    });

    // Limpieza después de cada test
    afterEach(() => {
        process.env = originalEnv;
    });

    describe('Gemini Provider', () => {
        // Test: Verifica que se envía el mensaje correctamente a Gemini
        it('should send message to Gemini correctly', async () => {
            process.env.AI_PROVIDER = 'gemini';
            // Simulamos una respuesta exitosa de Gemini
            mockSendMessage.mockResolvedValueOnce({
                response: {
                    text: () => 'Gemini Response'
                }
            });

            const response = await sendMessageToAI('System Prompt', 'User Message', []);

            // Verificamos que se llamó con el modelo correcto y el mensaje del usuario
            expect(mockGetGenerativeModel).toHaveBeenCalledWith({ model: 'gemini-2.0-flash' });
            expect(mockStartChat).toHaveBeenCalled();
            expect(mockSendMessage).toHaveBeenCalledWith('User Message');
            expect(response).toBe('Gemini Response');
        });

        // Test: Verifica que lanza error si falta la API Key
        it('should throw error if Gemini API key is missing', async () => {
            process.env.AI_PROVIDER = 'gemini';
            process.env.GEMINI_API_KEY = '';

            await expect(sendMessageToAI('Sys', 'User', [])).rejects.toThrow('Gemini API Key is not configured properly');
        });
    });

    describe('Groq Provider', () => {
        // Test: Verifica que se envía el mensaje correctamente a Groq
        it('should send message to Groq correctly', async () => {
            process.env.AI_PROVIDER = 'groq';
            process.env.GROQ_API_KEY = 'test-groq-key';

            // Simulamos una respuesta exitosa de la API REST de Groq
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    choices: [{ message: { content: 'Groq Response' } }]
                })
            });

            const response = await sendMessageToAI('System Prompt', 'User Message', []);

            // Verificamos que se hizo el fetch a la URL correcta
            expect(mockFetch).toHaveBeenCalledWith("https://api.groq.com/openai/v1/chat/completions", expect.any(Object));
            expect(response).toBe('Groq Response');
        });

        // Test: Verifica validación de API Key para Groq
        it('should throw error if Groq API key is missing', async () => {
            process.env.AI_PROVIDER = 'groq';
            process.env.GROQ_API_KEY = '';

            await expect(sendMessageToAI('Sys', 'User', [])).rejects.toThrow('Groq API Key is not configured');
        });

        // Test: Verifica manejo de errores de la API de Groq
        it('should handle Groq API errors', async () => {
            process.env.AI_PROVIDER = 'groq';
            process.env.GROQ_API_KEY = 'test-groq-key';

            // Simulamos un error 400/500 de la API
            mockFetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({ error: { message: 'Groq Error' } })
            });

            await expect(sendMessageToAI('Sys', 'User', [])).rejects.toThrow('Groq Error');
        });
    });
});
