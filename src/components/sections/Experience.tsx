import React from 'react';
import { DeveloperProfile } from '@/domain/profile.types';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Calendar, Briefcase } from 'lucide-react';

interface ExperienceProps {
    profile: DeveloperProfile;
}

export function Experience({ profile }: ExperienceProps) {
    return (
        <Section title="Experiencia Profesional" id="experience">
            <div className="space-y-6">
                {profile.experience.map((job, index) => (
                    <Card key={index} className="group hover:border-blue-500/50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {job.role}
                                </h3>
                                <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    <span className="font-medium">{job.company}</span>
                                    <span className="mx-2">•</span>
                                    <span className="text-sm">{job.sector}</span>
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full whitespace-nowrap">
                                <Calendar className="w-4 h-4 mr-2" />
                                {job.startDate} - {job.endDate} ({job.durationYears} años)
                            </div>
                        </div>

                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                            {job.responsibilities.map((resp, idx) => (
                                <li key={idx} className="text-sm md:text-base">
                                    {resp}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                            {job.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
