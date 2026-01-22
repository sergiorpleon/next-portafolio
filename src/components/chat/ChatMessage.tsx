import React from 'react';
import { Message } from '@/domain/chat.types';
import { Bot, User } from 'lucide-react';
import { clsx } from 'clsx';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
    message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isBot = message.role === 'assistant';

    return (
        <div className={clsx(
            "flex w-full mb-4",
            isBot ? "justify-start" : "justify-end"
        )}>
            <div className={clsx(
                "flex max-w-[85%] md:max-w-[75%] gap-3",
                isBot ? "flex-row" : "flex-row-reverse"
            )}>
                <div className={clsx(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                    isBot ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300" : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                )}>
                    {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                <div className={clsx(
                    "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                    isBot
                        ? "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-700"
                        : "bg-blue-600 text-white rounded-tr-none"
                )}>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
