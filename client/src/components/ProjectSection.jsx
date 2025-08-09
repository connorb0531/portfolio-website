export default function ProjectSection({ title, blurb, images = [], link, reverse = false }) {
    return (
      <section className="py-10 snap-start flex items-center">
        <div
          className={`mx-auto max-w-6xl px-4 py-16 w-full flex flex-col-reverse lg:flex-row ${
            reverse ? "lg:flex-row-reverse" : ""
          } gap-10 items-center`}
        >
          {/* TEXT */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-3xl font-bold mb-4">{title}</h3>
            <p className="text-lg leading-relaxed mb-6 max-w-prose">{blurb}</p>
            <div className="py-2 flex justify-center">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2  bg-slate-50 text-custom-dark-grey rounded-lg shadow hover:opacity-90 transition"
              >
                View Project
              </a>
            )}
            </div>
          </div>
          {/* IMAGES */}
          <div className="w-full lg:w-1/2">
            <div className="hidden lg:flex items-center justify-center">
              <img
                src={images[0]}
                alt={`${title} screenshot`}
                className="w-[95%] h-auto object-contain rounded-2xl shadow transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="lg:hidden flex items-center justify-center">
              <img
                src={images[0]}
                alt={`${title} screenshot`}
                className="w-0.8 max-w-xs h-auto object-contain rounded-2xl shadow transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
