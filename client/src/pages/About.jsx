import TechStack from "../components/TechStack";

export default function About() {
    return (
        <div id="about" className="min-h-screen px-2 py-12 max-w-screen-lg mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
                About    
            </h2>
            <div className="flex flex-row lg:flex-row gap-20 justify-between">
                {/* Portrait + Text Column*/}
                <div className="flex flex-col gap-6 flex-1">
                    <img 
                        src="/profile_template.png" 
                        alt="Portrait"
                        className="w-24 sm:w-32 md:w-40 lg:w-48 object-contain rounded-2xl shadow-md bg-gray-600"
                    />
                    <p className="text-lg leading-relaxed">
                        I'm Connor Buckley, a computer science student with a strong interest in physics-based simulations and data modeling. 
                        My passion for computers began with childhood curiosity and evolved into a drive to understand how software and physics intersect. 
                        I earned my Associate Degree for Transfer in Computer Science from San Diego Mesa College. 
                        My goal is to work in a research environment or industry where I can apply computational tools to solve complex physical problems.
                        I'm especially interested in using AI/ML to enhance modeling accuracy in astrophysics, robotics, and quantum systems.
                        I hope to gain hands-on experience with large scientific datasets and deepen my ability to communicate technical ideas clearly.
                        I value a team-oriented environment and enjoy breaking down problems before seeking help, focusing on learning from setbacks.
                        This portfolio showcases my journey from self-taught programming to building real-world tools and simulations that reflect my interdisciplinary interests.
                    </p>    
                </div>
                {/* Stack Imgs */}
                <TechStack />
            </div>   
        </div>
    );
}