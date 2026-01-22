import { describe, it, expect } from 'vitest';
import { buildSystemPrompt } from '@/utils/promptBuilder';
import { DeveloperProfile } from '@/domain/profile.types';

describe('promptBuilder', () => {
    it('should build a system prompt with profile data', () => {
        const mockProfile: DeveloperProfile = {
            personal: {
                fullName: 'Test User',
                email: 'test@example.com',
                nationality: 'Testland',
                location: { province: 'Test', country: 'Land' },
                linkedin: 'linkedin.com/test',
                github: 'github.com/test'
            },
            professionalSummary: {
                title: 'Tester',
                yearsOfExperience: 5,
                description: 'Testing expert'
            },
            roles: ['Tester'],
            experience: [],
            projects: [],
            education: [],
            skills: {
                languages: ['TypeScript'],
                frontend: ['React'],
                backend: ['Node'],
                mobile: [],
                databases: [],
                tools: [],
                other: []
            },
            courses: [],
            languages: []
        };

        const prompt = buildSystemPrompt(mockProfile);

        expect(prompt).toContain('Test User');
        expect(prompt).toContain('Tester');
        expect(prompt).toContain('TypeScript, React, Node');
        expect(prompt).toContain('Testing expert');
    });
});
