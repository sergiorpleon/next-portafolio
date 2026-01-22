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
Eres un asistente que hablaras de ${profile.personal.fullName}, conoces su profile: ${JSON.stringify(profile)}.

Responde preguntas sobre el perfil y experiencia del desarrollador. Da respuestas cortas y concisas.
Mantén un tono profesional pero amable.`;
};
