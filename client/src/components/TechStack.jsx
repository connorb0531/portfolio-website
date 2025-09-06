import { Icon } from '@iconify/react';

const stackIcons = [
    { name: 'logos:java', title: 'Java' },
    { name: 'logos:python', title: 'Python' },
    { name: 'logos:javascript', title: 'JavaScript' },
    { name: 'logos:react', title: 'React' },
    { name: 'logos:spring-icon', title: 'Spring Boot' },
    { name: "logos:tensorflow", title: "TensorFlow" },
    { name: "logos:numpy", title: "NumPy" },   
    { name: 'logos:postgresql', title: 'PostgreSQL' },
    { name: 'logos:mongodb-icon', title: 'MongoDB' },
    { name: 'logos:nodejs-icon', title: 'Node.js' },
    { name: 'logos:express', title: 'Express.js', bg: 'bg-gray-300' },
    { name: 'logos:html-5', title: 'HTML5' },
    { name: 'logos:css-3', title: 'CSS3' },
    { name: 'logos:git-icon', title: 'Git' }
];

export default function TechStack() {
    return (
        <div className="grid grid-cols-4 gap-8 place-items-center pl-6">
            {stackIcons.map((icon, index) => (
                <div key={index} className="group flex flex-col items-center">
                    {/* Circle only for icon */}
                    <div
                        className={`flex items-center justify-center w-16 h-16 rounded-full transition-transform duration-300 hover:scale-125 ${icon.bg || ''}`}
                    >
                        <Icon icon={icon.name} width="48" height="48" />
                    </div>
                    {/* Title below, hidden until hover */}
                    <span className="mt-2 text-lg opacity-0 transition-all duration-300 group-hover:opacity-100">
                        {icon.title}
                    </span>
                </div>
            ))}
        </div>
    );
}
