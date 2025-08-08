import ContactForm from '../components/ContactForm';
import { Icon } from '@iconify/react';

export default function Contact() {
    return (
        <section
            id="contact"
            className="min-h-screen flex items-center justify-center px-4 relative"
        >
            <div className="max-w-2xl w-full">
                <h2 className="text-4xl font-bold text-center mb-8">Contact</h2>
                <ContactForm />
            </div>

            {/* Up arrow fixed to bottom-right of contact section */}
            <a
                href="#home"
                className="bg-slate-500 rounded-full p-3 hover:bg-slate-600 absolute bottom-6 right-6 flex items-center justify-center"
            >
                <Icon icon="mdi:arrow-up" width="24" height="24" className="text-white" />
            </a>
        </section>
    );
}
