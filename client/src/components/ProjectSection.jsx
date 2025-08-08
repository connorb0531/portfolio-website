export default function ProjectSection({ title, blurb, images = [], link, reverse = false }) {
    return (
      <section className="py-10 snap-start flex items-center">
        <div
          className={`mx-auto max-w-6xl px-4 py-16 w-full flex flex-col lg:flex-row ${
            reverse ? "lg:flex-row-reverse" : ""
          } gap-12 items-center`}
        >
          {/* IMAGES */}
          <div className="w-full lg:w-1/2">
            {images.length <= 1 ? (
              <>
                {/* Desktop */}
                <div className="hidden lg:flex items-center justify-center">
                  <img
                    src={images[0]}
                    alt={`${title} screenshot`}
                    className="w-[95%] h-auto object-contain rounded-2xl shadow transition-transform duration-300 hover:scale-105"
                  />
                </div>
                {/* Mobile/Tablet */}
                <div className="lg:hidden flex items-center justify-center">
                  <img
                    src={images[0]}
                    alt={`${title} screenshot`}
                    className="w-full h-auto object-contain rounded-2xl shadow transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Desktop: diagonal, slight overlap */}
                <div className="relative hidden lg:block h-[32rem]">
                <img
                    src={images[0]}
                    alt={`${title} screenshot 1`}
                    className="absolute top-0 left-0 w-[90%] h-auto object-contain rounded-2xl shadow z-10 transition-transform duration-300 hover:scale-105"
                />
                <img
                    src={images[1]}
                    alt={`${title} screenshot 2`}
                    className="absolute bottom-0 right-0 w-[90%] h-auto object-contain rounded-2xl shadow translate-x-[-25%] transition-transform duration-300 hover:scale-105"
                />
                </div>
  
                {/* Mobile/tablet: simple grid, no cropping */}
                <div className="grid grid-cols-2 gap-4 lg:hidden">
                  <img
                    src={images[0]}
                    alt={`${title} screenshot 1`}
                    className="w-full h-auto object-contain rounded-2xl shadow transition-transform duration-300 hover:scale-105"
                  />
                  <img
                    src={images[1]}
                    alt={`${title} screenshot 2`}
                    className="w-full h-auto object-contain rounded-2xl shadow transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </>
            )}
          </div>
  
          {/* TEXT */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-3xl font-bold mb-4">{title}</h3>
            <p className="text-lg leading-relaxed mb-6 max-w-prose">{blurb}</p>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-slate-50 text-custom-dark-grey rounded-lg shadow hover:opacity-90 transition"
              >
                View Project →
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }
  