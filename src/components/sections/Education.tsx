import React from 'react';
import { DeveloperProfile } from '@/domain/profile.types';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

interface EducationProps {
    profile: DeveloperProfile;
}

export function Education({ profile }: EducationProps) {
    return (
        <Section title="Formación" id="education">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Formal Education */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center text-gray-900 dark:text-white mb-6">
                        <GraduationCap className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                        Educación Académica
                    </h3>
                    {profile.education.map((edu, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                {edu.degree}
                            </h4>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">
                                {edu.institution}
                            </p>
                            <div className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>{edu.startYear} - {edu.endYear}</span>
                                <span>{edu.location}</span>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Courses & Certifications */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center text-gray-900 dark:text-white mb-6">
                        <Award className="w-6 h-6 mr-2 text-violet-600 dark:text-violet-400" />
                        Certificaciones y Cursos
                    </h3>
                    <div className="space-y-4">
                        {profile.courses.map((course, index) => (
                            <Card key={index} className="py-4 px-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">
                                            {course.course}
                                        </h4>
                                        <p className="text-sm text-violet-600 dark:text-violet-400 mt-1">
                                            {course.provider}
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="block text-sm font-bold text-gray-900 dark:text-white">
                                            {course.year}
                                        </span>
                                        <span className="block text-xs text-gray-500">
                                            {course.hours}h
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
