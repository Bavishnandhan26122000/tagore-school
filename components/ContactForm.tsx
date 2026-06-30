'use client';

import { useState } from 'react';
import { INSTITUTIONS, SITE } from '@/lib/data';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [values, setValues] = useState({
    name: '', phone: '', email: '', institution: '', message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) next.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'Please enter a valid email address.';
    if (!values.message.trim()) next.message = 'Please enter a message.';
    return next;
  }

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    // Clear the error for a field as soon as the user starts correcting it
    if (errors[field as keyof Errors]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setStatus('submitting');

    // No backend yet — open the user's mail client pre-filled, then show success.
    // Replace this block with a real API/Formspree call when a backend is ready.
    const institutionLabel =
      INSTITUTIONS.find((i) => i.id === values.institution)?.shortName ??
      (values.institution === 'general' ? 'General Enquiry' : 'Not specified');
    const subject = encodeURIComponent(`Website Enquiry — ${values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nPhone: ${values.phone || '—'}\nEmail: ${values.email}\n` +
      `Regarding: ${institutionLabel}\n\n${values.message}`,
    );

    setTimeout(() => {
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setStatus('success');
      setValues({ name: '', phone: '', email: '', institution: '', message: '' });
    }, 600);
  }

  if (status === 'success') {
    return (
      <div className="bg-[#F8F9FA] border border-[#D4AF37]/40 rounded-xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#D4AF37] mx-auto mb-4 flex items-center justify-center">
          <svg className="w-7 h-7 text-[#1B3A6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-[#1B3A6B] font-bold text-lg mb-2">Thank you!</h3>
        <p className="text-gray-600 font-sans text-sm mb-5">
          Your email client should have opened with your message ready to send. If it didn&#39;t,
          please write to us directly at{' '}
          <a href={`mailto:${SITE.email}`} className="text-[#1B3A6B] font-medium underline">{SITE.email}</a>.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-5 py-2.5 bg-[#1B3A6B] text-white font-bold text-sm font-sans rounded hover:bg-[#2451A0] transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputBase =
    'w-full px-4 py-2.5 border rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition-all';

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-sans font-medium text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            className={`${inputBase} ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
          />
          {errors.name && <p className="text-red-500 text-xs font-sans mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className="block text-sm font-sans font-medium text-gray-700 mb-1.5">
            Phone Number
          </label>
          <input
            id="cf-phone"
            type="tel"
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            className={`${inputBase} border-gray-200`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className="block text-sm font-sans font-medium text-gray-700 mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="cf-email"
          type="email"
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="your@email.com"
          aria-invalid={!!errors.email}
          className={`${inputBase} ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
        />
        {errors.email && <p className="text-red-500 text-xs font-sans mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="cf-institution" className="block text-sm font-sans font-medium text-gray-700 mb-1.5">
          Enquiry Regarding
        </label>
        <select
          id="cf-institution"
          value={values.institution}
          onChange={(e) => update('institution', e.target.value)}
          className={`${inputBase} border-gray-200 text-gray-700 bg-white`}
        >
          <option value="">Select an institution</option>
          {INSTITUTIONS.map((inst) => (
            <option key={inst.id} value={inst.id}>{inst.shortName}</option>
          ))}
          <option value="general">General Enquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-sm font-sans font-medium text-gray-700 mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="cf-message"
          rows={5}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Your message or enquiry..."
          aria-invalid={!!errors.message}
          className={`${inputBase} resize-none ${errors.message ? 'border-red-400' : 'border-gray-200'}`}
        />
        {errors.message && <p className="text-red-500 text-xs font-sans mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full px-6 py-3 bg-[#1B3A6B] text-white font-bold font-sans rounded hover:bg-[#2451A0] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>

      <p className="text-gray-400 font-sans text-xs text-center">
        We typically respond within 1–2 business days.
      </p>
    </form>
  );
}
