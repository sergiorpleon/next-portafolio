import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useChatStorage } from '@/hooks/useChatStorage';
import { Message } from '@/domain/chat.types';

describe('useChatStorage', () => {
    // Limpieza del sessionStorage antes de cada test
    beforeEach(() => {
        sessionStorage.clear();
        vi.clearAllMocks();
    });

    // Test: Verifica estado inicial sin mensajes
    it('should initialize with empty messages', () => {
        const { result } = renderHook(() => useChatStorage());
        expect(result.current.messages).toEqual([]);
        expect(result.current.isInitialized).toBe(true);
    });

    // Test: Verifica que los mensajes se guardan en sessionStorage
    it('should save messages to sessionStorage', () => {
        const { result } = renderHook(() => useChatStorage());
        const newMessages: Message[] = [{ id: '1', role: 'user', content: 'Hello', createdAt: Date.now() }];

        act(() => {
            result.current.saveMessages(newMessages);
        });

        expect(result.current.messages).toEqual(newMessages);
        expect(sessionStorage.getItem('chat_history')).toBe(JSON.stringify(newMessages));
    });

    // Test: Verifica que los mensajes se cargan al iniciar si existen en sessionStorage
    it('should load messages from sessionStorage on init', () => {
        const storedMessages: Message[] = [{ id: '1', role: 'user', content: 'Hi', createdAt: Date.now() }];
        sessionStorage.setItem('chat_history', JSON.stringify(storedMessages));

        const { result } = renderHook(() => useChatStorage());

        expect(result.current.messages).toEqual(storedMessages);
    });

    // Test: Verifica que se borra el historial correctamente
    it('should clear history', () => {
        const storedMessages: Message[] = [{ id: '1', role: 'user', content: 'Hi', createdAt: Date.now() }];
        sessionStorage.setItem('chat_history', JSON.stringify(storedMessages));

        const { result } = renderHook(() => useChatStorage());

        act(() => {
            result.current.clearHistory();
        });

        expect(result.current.messages).toEqual([]);
        expect(sessionStorage.getItem('chat_history')).toBeNull();
    });
});
