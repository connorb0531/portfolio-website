import ContactForm from '../components/ContactForm';

export default function Contact() {
    return (
        <section id="contact" className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                <h2 className="text-4xl font-bold text-center mb-8">Contact</h2>
                <ContactForm />
            </div>
        </section>
    );
}
