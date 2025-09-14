import { Icon } from '@iconify/react';
import PixelWalkCanvas from '../components/PixelWalkCanvas';

export default function Home() {
  return (
    <>
      <div
        id="home-hero"
        className="relative flex justify-center items-center h-screen bg-custom-dark-grey text-white"
      >
        {/* PIXI on top visually, but doesn't block clicks */}
        <div id="pixi-layer" className="absolute inset-0 pointer-events-none z-20" />
        <PixelWalkCanvas
          containerId="pixi-layer"     
          listenTargetId="home-hero"   
          anchorId="hero-content"
          padX={90}
          padY={80}
          scale={6}
          walkFps={4}
          speed={120}
        />

        {/* Foreground content sits *under* the pixels visually */}
        <div
          id="hero-content"
          className="relative z-10 flex flex-col items-center space-y-3 text-center"
        >
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

          {/* Buttons — smaller on small screens */}
          <div className="flex flex-wrap justify-center gap-3 py-6">
            <a
              href="/assets/Connor Buckley Resume.pdf"
              download
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-50 text-custom-dark-grey rounded-lg shadow hover:opacity-90 transition text-sm sm:text-base"
            >
              <Icon icon="mdi:download" width="18" height="18" className="sm:w-5 sm:h-5" />
              Resume
            </a>

            <a
              href="#about"
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-500 text-white rounded-lg shadow hover:opacity-90 transition text-sm sm:text-base"
            >
              View my work
            </a>

            <a
              href="#contact"
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-50 text-custom-dark-grey rounded-lg shadow hover:opacity-90 transition text-sm sm:text-base"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
