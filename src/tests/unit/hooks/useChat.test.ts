import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useChat } from '@/hooks/useChat';
import { Message } from '@/domain/chat.types';

// Mock de useChatStorage para aislar la lógica del hook de chat
// Evitamos que use el sessionStorage real durante estos tests
const mockSaveMessages = vi.fn();
const mockClearHistory = vi.fn();
const mockMessages: Message[] = [];

vi.mock('@/hooks/useChatStorage', () => ({
    useChatStorage: () => ({
        messages: mockMessages,
        saveMessages: mockSaveMessages,
        clearHistory: mockClearHistory,
        isInitialized: true
    })
}));

// Mock de fetch global para interceptar las llamadas a nuestra API interna (/api/chat)
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('useChat', () => {
    // Limpieza de mocks antes de cada test para asegurar aislamiento
    beforeEach(() => {
        vi.clearAllMocks();
        mockMessages.length = 0; // Clear array
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    // Test: Verifica el estado inicial del hook
    it('should initialize with default states', () => {
        const { result } = renderHook(() => useChat());
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    // Test: Flujo completo de envío de mensaje exitoso
    it('should send a message and update state successfully', async () => {
        const { result } = renderHook(() => useChat());

        // Simulamos respuesta exitosa del backend
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ response: 'AI Response' })
        });

        await act(async () => {
            await result.current.sendMessage('Hello');
        });

        // Verificamos actualización optimista y guardado final
        expect(mockSaveMessages).toHaveBeenCalled();
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    // Test: Manejo de errores devueltos por la API (ej. 400, 500)
    it('should handle API errors gracefully', async () => {
        const { result } = renderHook(() => useChat());

        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: 'API Error' })
        });

        await act(async () => {
            await result.current.sendMessage('Hello');
        });

        expect(result.current.error).toBe('API Error');
        expect(result.current.isLoading).toBe(false);
    });

    // Test: Manejo de errores de red (ej. sin conexión)
    it('should handle network errors', async () => {
        const { result } = renderHook(() => useChat());

        mockFetch.mockRejectedValueOnce(new Error('Network Error'));

        await act(async () => {
            await result.current.sendMessage('Hello');
        });

        expect(result.current.error).toBe('Network Error');
        expect(result.current.isLoading).toBe(false);
    });

    // Test: Validación de entrada vacía
    it('should not send empty messages', async () => {
        const { result } = renderHook(() => useChat());

        await act(async () => {
            await result.current.sendMessage('');
        });

        expect(mockFetch).not.toHaveBeenCalled();
    });
});
