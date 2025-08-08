import { Icon } from '@iconify/react';

export default function Footer() {
    return (
        <footer className="bg-navbar-grey text-sm p-10">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-center items-center text-center sm:text-left">

                <div className="flex flex-col items-center space-y-6">
                    <a
                        href="https://github.com/connorb0531"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-400"
                    >
                        <Icon icon="mdi:github" width="50" height="50" />
                    </a>
                    <span>Connor Buckley © {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    );
}
