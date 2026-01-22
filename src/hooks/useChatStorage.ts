import { useState, useEffect } from 'react';
import { Message } from '@/domain/chat.types';

const STORAGE_KEY = 'chat_history';

// Hook personalizado para manejar la persistencia del chat en sessionStorage
export const useChatStorage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Cargar mensajes guardados al montar el componente
    useEffect(() => {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setMessages(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse chat history', e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Guardar mensajes en estado y sessionStorage
    const saveMessages = (newMessages: Message[]) => {
        setMessages(newMessages);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
    };

    // Borrar historial completo
    const clearHistory = () => {
        setMessages([]);
        sessionStorage.removeItem(STORAGE_KEY);
    };

    return {
        messages,
        saveMessages,
        clearHistory,
        isInitialized
    };
};
