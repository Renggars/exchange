import React from "react";

interface FeatureSectionLeftProps {
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
  imageOverlayText: string;
}

export default function FeatureSectionLeft({
  title,
  description,
  buttonText,
  imageSrc,
  imageAlt,
  imageOverlayText,
}: FeatureSectionLeftProps) {
  return (
    <section className="container mx-auto py-16 px-6 md:flex items-center justify-between gap-8">
      <div className="md:w-1/2 flex justify-center md:justify-start">
        <div className="relative w-full max-w-lg aspect-video bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
            <span className="text-xl">{imageOverlayText}</span>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 space-y-6 text-center md:text-left mt-8 md:mt-0">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          {title}
        </h2>
        <p className="text-lg text-gray-300">{description}</p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors mt-4">
          {buttonText}
        </button>
      </div>
    </section>
  );
}
