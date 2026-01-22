"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
    onSend: (message: string) => void;
    isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Manejo del envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSend(input);
            setInput('');
        }
    };

    // Permitir enviar con Enter (sin Shift)
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Ajuste automático de altura del textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [input]);

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="relative flex items-end gap-2">
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Pregúntame sobre Sergio..."
                    className="w-full resize-none max-h-32 py-3 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-950 focus:ring-0 transition-all text-sm scrollbar-hide"
                    rows={1}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </form>
    );
}
