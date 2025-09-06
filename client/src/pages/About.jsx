// About.jsx
import SlideIn from "../components/SlideIn";
import TechStack from "../components/TechStack";
import HeadshotGif from "../components/HeadshotGif";

export default function About() {
    return (
        <div id="about" className="min-h-screen px-2 py-6 max-w-screen-lg mx-auto">
            <h2 className="text-4xl font-bold text-center pb-20">About</h2>

            <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start justify-center">
                {/* Portrait + Text Column (slide from left) */}
                <SlideIn axis="x" offset={-80} className="flex flex-col gap-6 flex-1">
                    <div className="flex justify-center">
                        <HeadshotGif/>
                    </div>
                    <p className="text-lg leading-relaxed text-left px-5">
                        I'm a computer science student at San José State University with an interest in physics, simulations, and data modeling.
                        After earning my Associate Degree for Transfer in CS from San Diego Mesa College, I chose the Bay Area to further my ambitions in research and development.
                        I value teamwork, clear communication, and learning from challenges—this portfolio highlights my journey so far.
                    </p>
                </SlideIn>

                {/* Tech Stack Column (slide from right) */}
                <SlideIn axis="x" offset={80} delay={0.05} className="flex-1 flex justify-center">
                    <TechStack />
                </SlideIn>
            </div>
        </div>
    );
}
