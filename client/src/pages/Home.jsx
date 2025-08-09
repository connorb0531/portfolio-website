import { Icon } from '@iconify/react';
import PixelWalkCanvas from '../components/PixelWalkCanvas';

export default function Home() {
  return (
    <>
      <div
        id="home-hero"
        className="relative flex justify-center items-center h-screen bg-custom-dark-grey text-white"
      >
        {/* PIXI canvas orbits around the inner content */}
        <PixelWalkCanvas
          containerId="home-hero"
          anchorId="hero-content"
          padX={90}
          padY={80}
          scale={6}
          walkFps={4}
          speed={120}
        />

        <div id="hero-content" className="flex flex-col items-center space-y-3 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Hello, I'm Connor Buckley
          </h1>
          <div className="text-xl sm:text-2xl md:text-3xl">
            <h2>
              Computer Science major at{' '}
              <span className="relative inline-block font-bold group">
                <span className="text-blue-600">S</span>
                <span className="text-yellow-400">J</span>
                <span className="text-blue-600">S</span>
                <span className="text-yellow-400">U</span>
              </span>
            </h2>
          </div>

          <div className="flex space-x-4 py-6 text-md">
            <a
              href="/ConnorBuckley_Resume.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-custom-dark-grey rounded-lg shadow hover:opacity-90 transition"
            >
              <Icon icon="mdi:download" width="20" height="20" />
              Resume
            </a>
            <a href="#about" className="px-4 py-2 bg-slate-500 text-white rounded-lg shadow hover:opacity-90 transition">
              View my work
            </a>
            <a href="#contact" className="px-4 py-2 bg-slate-50 text-custom-dark-grey rounded-lg shadow hover:opacity-90 transition">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
