export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-custom-dark-grey text-white">
      <div className="flex flex-col items-center space-y-3 text-center">
        {/* Big intro text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Hello, I'm Connor Buckley
        </h1>
        <div className="text-xl sm:text-2xl md:text-3xl">
            <h2>
            Computer Science major at{' '}
            <span className="relative inline-block font-bold group">
                {/* SJSU letters (the actual hover target) */}
                <span className="text-blue-600">S</span>
                <span className="text-yellow-400">J</span>
                <span className="text-blue-600">S</span>
                <span className="text-yellow-400">U</span>

                {/* "Go Spartans!" only appears when SJSU is hovered */}
                <span
                className="
                    absolute top-0 left-full  whitespace-nowrap
                    opacity-0 translate-x-0
                    text-white
                    group-hover:opacity-100 group-hover:translate-x-2
                    transition-all duration-300 pointer-events-none
                "
                >
                ... Go Spartans!
                </span>
            </span>
            </h2>

        </div>

        {/* Slightly smaller buttons */}
        <div className="flex space-x-4 py-6 text-md">
          <button className="px-4 py-2 bg-slate-50 text-custom-dark-grey rounded-lg shadow hover:opacity-90 transition">
            Resume
          </button>
          <button className="px-4 py-2 bg-slate-500 text-white rounded-lg shadow hover:opacity-90 transition">
            View my work
          </button>
          <button className="px-4 py-2 bg-slate-50 text-custom-dark-grey rounded-lg shadow hover:opacity-90 transition">
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
}
