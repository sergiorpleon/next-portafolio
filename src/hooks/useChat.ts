import { useState, useCallback } from 'react';
import { Message, Role } from '@/domain/chat.types';
import { useChatStorage } from './useChatStorage';

export const useChat = () => {
    const { messages, saveMessages, clearHistory, isInitialized } = useChatStorage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            createdAt: Date.now(),
        };

        // Optimistic update
        const newMessages = [...messages, userMessage];
        saveMessages(newMessages);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: content,
                    history: messages,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                createdAt: Date.now(),
            };

            saveMessages([...newMessages, assistantMessage]);
        } catch (err) {
            console.error(err);
            setError('Error al conectar con el asistente. Por favor, intenta de nuevo.');
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
