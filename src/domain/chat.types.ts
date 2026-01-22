export type Role = 'user' | 'assistant' | 'system';

export interface Message {
    id: string;
    role: Role;
    content: string;
    createdAt: number;
}

export interface ChatState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
}
