import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} Sergio Ramón Pérez León. Casi todos los derechos reservados.
                    </p>
                </div>
                <div className="flex space-x-6">
                    <a href="https://linkedin.com/in/sergiorpleon" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://github.com/sergiorpleon" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="mailto:sergiorpleon@gmail.com" className="text-gray-400 hover:text-red-500 transition-colors">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
