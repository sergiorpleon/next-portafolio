"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface ImageSliderProps {
    images: string[];
    title: string;
}

export function ImageSlider({ images, title }: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const prevSlide = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link clicks if wrapped in <a>
        e.stopPropagation();
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="relative w-full h-48 sm:h-64 mb-4 group rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div
                className="w-full h-full relative duration-500 transition-transform ease-out"
            >
                <Image
                    src={images[currentIndex]}
                    alt={`${title} - image ${currentIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Left Arrow */}
            {images.length > 1 && (
                <div className="hidden group-hover:block absolute top-[50%] -translate-y-[-50%] left-2 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-black/70 transition-colors z-10" onClick={prevSlide}>
                    <ChevronLeft size={20} />
                </div>
            )}

            {/* Right Arrow */}
            {images.length > 1 && (
                <div className="hidden group-hover:block absolute top-[50%] -translate-y-[-50%] right-2 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-black/70 transition-colors z-10" onClick={nextSlide}>
                    <ChevronRight size={20} />
                </div>
            )}

            {/* Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-10">
                    {images.map((_, slideIndex) => (
                        <div
                            key={slideIndex}
                            onClick={(e) => goToSlide(slideIndex, e)}
                            className={clsx(
                                "text-2xl cursor-pointer w-2 h-2 rounded-full transition-all shadow-sm",
                                currentIndex === slideIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                            )}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
}
