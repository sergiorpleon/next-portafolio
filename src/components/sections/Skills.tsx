import React from 'react';
import { DeveloperProfile } from '@/domain/profile.types';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Code2, Database, Layout, Smartphone, Terminal, Wrench } from 'lucide-react';

interface SkillsProps {
    profile: DeveloperProfile;
}

export function Skills({ profile }: SkillsProps) {
    const { skills } = profile;

    const skillCategories = [
        { title: 'Lenguajes', icon: Code2, items: skills.languages },
        { title: 'Frontend', icon: Layout, items: skills.frontend },
        { title: 'Backend', icon: Terminal, items: skills.backend },
        { title: 'Mobile', icon: Smartphone, items: skills.mobile },
        { title: 'Bases de Datos', icon: Database, items: skills.databases },
        { title: 'Herramientas y Otros', icon: Wrench, items: [...skills.tools, ...skills.other] },
    ];

    return (
        <Section title="Habilidades Técnicas" id="skills" className="bg-gray-50 dark:bg-gray-900/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillCategories.map((category, index) => (
                    <Card key={index} className="hover:border-violet-500/50 transition-colors">
                        <div className="flex items-center mb-4">
                            <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 mr-3">
                                <category.icon className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                {category.title}
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {category.items.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
