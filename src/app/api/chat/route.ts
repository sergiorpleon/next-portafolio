import { NextResponse } from 'next/server';
import { buildSystemPrompt } from '@/utils/promptBuilder';
import { sendMessageToAI } from '@/services/ai.service';
import profileData from '@/data/profile.json';
import { DeveloperProfile } from '@/domain/profile.types';

// Force cast since we know the structure matches
const profile = profileData as unknown as DeveloperProfile;

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        const systemPrompt = buildSystemPrompt(profile);

        // Format history for Gemini (excluding the current message which is sent separately)
        // We only take the last 10 messages to avoid token limits and keep context relevant
        const formattedHistory = history
            .slice(-10)
            .map((msg: { role: string; content: string }) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: msg.content
            }));

        const response = await sendMessageToAI(systemPrompt, message, formattedHistory);

        return NextResponse.json({ response });
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal Server Error' },
            { status: 500 }
        );
    }
}
