// pages/Contact.jsx
import RevealOnScroll from "../components/RevealOnScroll";
import { Icon } from "@iconify/react";

export default function Contact() {
    return (
        <section id="contact" className="min-h-[80vh] flex flex-col items-center justify-between pt-10 px-4 relative">
            <div className="max-w-2xl w-full">
                <h2 className="text-4xl font-bold text-center mb-12">Contact</h2>

                {/* Contact icons */}
                <RevealOnScroll selectors="a" className="flex justify-center space-x-10 sm:space-x-12 p-4">
                    <a
                        href="mailto:connorbuckley144@gmail.com"
                        className="bg-slate-50 text-custom-dark-grey rounded-lg shadow hover:bg-slate-200 hover:scale-105 transition p-4 sm:p-6 flex flex-col items-center"
                    >
                        <Icon icon="mdi:email" width="50" height="50" className="sm:w-[60px] sm:h-[60px]" />

                    </a>

                    <a
                        href="https://github.com/connorb0531"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-50 text-custom-dark-grey rounded-lg shadow hover:bg-slate-200 hover:scale-105 transition p-4 sm:p-6 flex flex-col items-center"
                    >
                        <Icon icon="mdi:github" width="50" height="50" className="sm:w-[60px] sm:h-[60px]" />

                    </a>

                    <a
                        href="https://www.linkedin.com/in/connor-buckley-b36772272"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-50 text-custom-dark-grey rounded-lg shadow hover:bg-slate-200 hover:scale-105 transition p-4 sm:p-6 flex flex-col items-center"
                    >
                        <Icon icon="mdi:linkedin" width="50" height="50" className="sm:w-[60px] sm:h-[60px]" />

                    </a>
                </RevealOnScroll>
            </div>

            {/* Scroll up button - bottom right of contact section */}
            <div className="w-full flex justify-end p-4 pb-8 mt-8">
                <a
                    href="#home"
                    className="bg-slate-500 rounded-full p-3 hover:bg-slate-600 flex items-center justify-center"
                >
                    <Icon icon="mdi:arrow-up" width="27" height="27" className="text-white" />
                </a>
            </div>
        </section>
    );
}
