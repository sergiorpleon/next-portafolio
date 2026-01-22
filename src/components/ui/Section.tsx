import React from 'react';

import { twMerge } from 'tailwind-merge';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    id?: string;
}

export function Section({ title, subtitle, children, className, id, ...props }: SectionProps) {
    return (
        <section
            id={id}
            className={twMerge("py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", className)}
            {...props}
        >
            {(title || subtitle) && (
                <div className="mb-6 text-center">
                    {title && (
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 mb-4">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
            {children}
        </section>
    );
}
