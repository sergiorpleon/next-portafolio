import React from 'react';
import { DeveloperProfile } from '@/domain/profile.types';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { FolderGit2, Github, ExternalLink, Youtube } from 'lucide-react';

interface ProjectsProps {
    profile: DeveloperProfile;
}

export function Projects({ profile }: ProjectsProps) {
    return (
        <Section title="Proyectos Destacados" id="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {profile.projects.map((project, index) => (
                    <Card key={index} className="flex flex-col h-full hover:border-blue-500/50 transition-all hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>
                                <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${project.type === 'professional'
                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                    }`}>
                                    {project.type}
                                </span>
                            </div>
                            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                <FolderGit2 className="w-5 h-5" />
                            </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                            {project.description}
                        </p>

                        <div className="space-y-4 mt-auto">
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex gap-3">
                                    {project.repo && (
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                        >
                                            <Github className="w-4 h-4 mr-2" />
                                            Código
                                        </a>
                                    )}
                                    {project.video && (
                                        <a
                                            href={project.video}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                                        >
                                            <Youtube className="w-4 h-4 mr-2" />
                                            Video
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition-all"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Demo
                                        </a>
                                    )}
                                </div>
                                {project.year && (
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                        {project.year}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
