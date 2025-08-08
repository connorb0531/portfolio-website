import TechStack from "../components/TechStack";

export default function About() {
    return (
        <div id="about" className="min-h-screen px-2 py-12 max-w-screen-lg mx-auto">
            <h2 className="text-4xl font-bold text-center pb-20">
                About    
            </h2>
            <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start justify-center"> 
                
                {/* Portrait + Text Column */}
                <div className="flex flex-col gap-6 flex-1">
                    <div className="flex justify-center">
                        <img 
                            src="/profile_template.png" 
                            alt="Portrait"
                            className="w-24 sm:w-32 md:w-40 lg:w-48 object-contain rounded-2xl shadow-md bg-gray-600"
                        />
                    </div>
                    <p className="text-lg leading-relaxed text-left px-5">
                        I'm a computer science student at San José State University with a passion for physics-based simulations and data modeling.
                        After earning my Associate Degree for Transfer in Computer Science from San Diego Mesa College,
                        I've focused on applying computational tools and AI/ML to improve modeling in astrophysics, robotics, and quantum systems.
                        I value teamwork, clear communication, and learning from challenges, and this portfolio highlights my journey from self-taught programming to building real-world tools and simulations.
                    </p>    
                </div>

                {/* Tech Stack Column */}
                <div className="flex-1 flex justify-center">
                    <TechStack />
                </div>
            </div>   
        </div>
    );
}
