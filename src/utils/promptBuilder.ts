import { DeveloperProfile } from '@/domain/profile.types';

export const buildSystemPrompt = (profile: DeveloperProfile): string => {
    const skills = [
        ...profile.skills.languages,
        ...profile.skills.frontend,
        ...profile.skills.backend,
        ...profile.skills.mobile,
        ...profile.skills.databases
    ].join(', ');

    return `Sistema:
Eres un asistente que representa a ${profile.personal.fullName}, ${profile.professionalSummary.title}.
Experiencia: ${profile.professionalSummary.yearsOfExperience} años. ${profile.professionalSummary.description}
Stack Principal: ${skills}.

Responde preguntas sobre el perfil y experiencia del desarrollador.
Mantén un tono profesional pero amable.`;
};
