import { describe, it, expect } from 'vitest';
import { buildSystemPrompt } from '@/utils/promptBuilder';
import { DeveloperProfile } from '@/domain/profile.types';

describe('Prompt Builder', () => {
    // Test: Verifica que el prompt del sistema se construye correctamente con los datos del perfil
    it('should build a system prompt containing profile name', () => {
        // Datos de prueba (mock) para el perfil
        const mockProfile: DeveloperProfile = {
            personal: {
                fullName: "Test User",
                email: "test@example.com",
                nationality: "Testland",
                location: { province: "Test", country: "Test" },
                linkedin: "",
                github: ""
            },
            skills: {
                languages: ["JS"],
                frontend: ["React"],
                backend: ["Node"],
                mobile: [],
                databases: [],
                tools: [],
                other: []
            },
            // Add other required fields with empty/mock data
            professionalSummary: { title: "", yearsOfExperience: 0, description: "" },
            roles: [],
            experience: [],
            projects: [],
            education: [],
            courses: [],
            languages: []
        };

        const prompt = buildSystemPrompt(mockProfile);

        // Verificamos que el prompt contenga la información clave del perfil
        expect(prompt).toContain("Test User");
        expect(prompt).toContain("Sistema:");
    });
});
