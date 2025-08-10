import ContactForm from '../components/ContactForm';
import { Icon } from '@iconify/react';

export default function Contact() {
    return (
        <section
            id="contact"
            className="flex flex-col items-center justify-center pt-20 px-4 relative"
        >
            <div className="max-w-2xl w-full">
                <h2 className="text-4xl font-bold text-center mb-8">Contact</h2>
                <ContactForm />
            </div>

            {/* Up arrow below content, aligned right */}
            <div className="mt-10 w-full flex justify-end p-2 pb-4">
                <a
                    href="#home"
                    className="bg-slate-500 rounded-full p-3 hover:bg-slate-600 flex items-center justify-center "
                >
                    <Icon icon="mdi:arrow-up" width="27" height="27" className="text-white" />
                </a>
            </div>
        </section>
    );
}
