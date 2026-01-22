import React from 'react';
import { DeveloperProfile } from '@/domain/profile.types';
import { Github, Linkedin, Mail, MapPin, Download } from 'lucide-react';
import { Section } from '@/components/ui/Section';

interface HeroProps {
    profile: DeveloperProfile;
}

export function Hero({ profile }: HeroProps) {
    const { personal, professionalSummary } = profile;

    return (
        <Section className="min-h-[90vh] flex flex-col justify-center items-center text-center pt-20">
            <div className="space-y-6 max-w-4xl">

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Hola, soy <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 dark:from-blue-400 dark:via-violet-400 dark:to-fuchsia-400">
                        {personal.fullName}
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                    {professionalSummary.title}
                </p>

                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    {professionalSummary.description}
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <a
                        href={personal.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-600/20"
                    >
                        <Linkedin className="w-5 h-5 mr-2" />
                        LinkedIn
                    </a>
                    <a
                        href={personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-6 py-3 rounded-lg bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors font-medium shadow-lg"
                    >
                        <Github className="w-5 h-5 mr-2" />
                        GitHub
                    </a>
                    <a
                        href={`mailto:${personal.email}`}
                        className="flex items-center px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                    >
                        <Mail className="w-5 h-5 mr-2" />
                        Contactar
                    </a>
                </div>

                <div className="flex items-center justify-center gap-6 pt-8 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {personal.location.province}, {personal.location.country}
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold text-gray-900 dark:text-white mr-1">
                            {professionalSummary.yearsOfExperience}+
                        </span>
                        Años de experiencia
                    </div>
                </div>
            </div>
        </Section>
    );
}
