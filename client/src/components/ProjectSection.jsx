import SlideIn from "./SlideIn";

export default function ProjectSection({
  index,
  title,
  blurb,
  image,
  link,
  reverse,
}) {
  const isOdd = index % 2 === 1;
  const slideOffset = isOdd ? -80 : 80;

  // flip layout only on large screens
  const rowDir = isOdd ? "" : "lg:flex-row-reverse";
  const forceDir = reverse ? "lg:flex-row-reverse" : rowDir;

  return (
    <section className="py-10 snap-start flex items-center">
      <SlideIn
        axis="x"
        offset={slideOffset}
        delay={0.1}
        className={`mx-auto max-w-6xl px-4 py-16 w-full flex flex-col-reverse lg:flex-row ${forceDir} gap-10 items-center`}
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
                className="inline-block px-4 py-2 bg-slate-50 text-custom-dark-grey rounded-lg shadow hover:opacity-90 transition"
              >
                View Project
              </a>
            )}
          </div>
        </div>

        {/* IMAGE */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center justify-center">
            <img
              src={image}
              alt={`${title} screenshot`}
              className="max-w-full w-[95%] h-auto object-contain rounded-2xl shadow transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </SlideIn>
    </section>
  );
}
