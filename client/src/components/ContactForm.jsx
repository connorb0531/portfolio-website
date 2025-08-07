import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to send');

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block mb-1">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-600 rounded bg-transparent text-white"
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-600 rounded bg-transparent text-white"
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-600 rounded bg-transparent text-white"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {submitted && <p className="text-green-500">Message sent. Thank you!</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-slate-50 text-custom-dark-grey rounded-lg shadow hover:opacity-90 transition px-6 py-2"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
