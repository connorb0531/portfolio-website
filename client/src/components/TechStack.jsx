import { Icon } from '@iconify/react';

const stackIcons = [
    { name: 'logos:java', title: 'Java' },
    { name: 'logos:python', title: 'Python' },
    { name: 'logos:postgresql', title: 'PostgreSQL' },
    { name: 'logos:javascript', title: 'JavaScript' },
    { name: 'logos:html-5', title: 'HTML5' },
    { name: 'logos:css-3', title: 'CSS3' },
    { name: 'logos:react', title: 'React' },
    { name: 'logos:spring-icon', title: 'Spring Boot' },
    { name: 'logos:nodejs-icon', title: 'Node.js' },
    { name: 'logos:express', title: 'Express.js', bg: 'bg-white' }, // custom background
    { name: 'logos:mongodb-icon', title: 'MongoDB' },
    { name: 'logos:git-icon', title: 'Git' },
];

export default function TechStack() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 place-items-center flex py-8">
            {stackIcons.map((icon, index) => (
                <div
                    key={index}
                    className={`flex items-center justify-center p-2 rounded-full ${
                        icon.bg || ''
                    }`}
                    title={icon.title}
                >
                    <Icon
                        icon={icon.name}
                        width="48"
                        height="48"
                    />
                </div>
            ))}
        </div>
    );
}
