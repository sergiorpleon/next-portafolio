"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { MessageCircle, X, Loader2, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';

export function Chat() {
    // Hook principal que maneja toda la lógica del chat (estado, envío, persistencia)
    const { messages, sendMessage, clearHistory, isLoading, isInitialized } = useChat();
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll automático al último mensaje cuando cambia la lista de mensajes o se abre el chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    // No renderizamos nada hasta que el almacenamiento esté inicializado para evitar flash de contenido
    if (!isInitialized) return null;

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110",
                    isOpen
                        ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 rotate-90"
                        : "bg-blue-600 text-white hover:bg-blue-700 animate-bounce-subtle"
                )}
                aria-label="Toggle chat"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>

            {/* Chat Window */}
            <div className={clsx(
                "fixed bottom-24 right-6 z-40 w-[90vw] md:w-[400px] max-h-[600px] h-[70vh] bg-white dark:bg-gray-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden",
                isOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 translate-y-10 pointer-events-none"
            )}>
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Asistente Virtual</h3>
                        <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            En línea
                        </p>
                    </div>
                    {messages.length > 0 && (
                        <button
                            onClick={clearHistory}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            title="Borrar historial"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500 dark:text-gray-400 space-y-4">
                            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-2">
                                <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <p className="text-sm">
                                ¡Hola! Soy el asistente virtual de Sergio.
                                <br />
                                Pregúntame sobre su experiencia, proyectos o habilidades.
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {["¿Qué experiencia tiene?", "Habilidades principales", "Contacto"].map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() => sendMessage(suggestion)}
                                        className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-700"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg) => (
                                <ChatMessage key={msg.id} message={msg} />
                            ))}
                            {isLoading && (
                                <div className="flex justify-start w-full mb-4">
                                    <div className="flex items-center gap-2 p-3 rounded-2xl rounded-tl-none bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                        <span className="text-xs text-gray-500">Escribiendo...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Input */}
                <ChatInput onSend={sendMessage} isLoading={isLoading} />
            </div>
        </>
    );
}
