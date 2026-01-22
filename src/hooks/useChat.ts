import { useState, useCallback } from 'react';
import { Message, Role } from '@/domain/chat.types';
import { useChatStorage } from './useChatStorage';

export const useChat = () => {
    // Hook de almacenamiento para persistir mensajes en sessionStorage
    const { messages, saveMessages, clearHistory, isInitialized } = useChatStorage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Función principal para enviar mensajes a la IA
    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            createdAt: Date.now(),
        };

        // Actualización optimista: mostramos el mensaje del usuario inmediatamente
        const newMessages = [...messages, userMessage];
        saveMessages(newMessages);
        setIsLoading(true);
        setError(null);

        try {
            // Llamada a nuestra API interna que se comunica con Gemini/Groq
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: content,
                    history: messages, // Enviamos historial para contexto
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            const data = await response.json();

            // Creamos el mensaje de respuesta del asistente
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                createdAt: Date.now(),
            };

            // Guardamos ambos mensajes (usuario + asistente)
            saveMessages([...newMessages, assistantMessage]);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Error al conectar con el asistente.');
        } finally {
            setIsLoading(false);
        }
    }, [messages, saveMessages]);

    return {
        messages,
        sendMessage,
        clearHistory,
        isLoading,
        error,
        isInitialized
    };
};
