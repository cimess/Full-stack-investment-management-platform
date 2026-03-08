import React, { useState, useRef } from 'react';
import { FiSend, FiMail, FiMapPin, FiPhone, FiTwitter, FiLinkedin, FiInstagram, FiLoader, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

function ContactUs() {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Replace these with your actual EmailJS service, template, and public key
    // Ideally, use environment variables: import.meta.env.VITE_EMAILJS_SERVICE_ID, etc.
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
          console.log(result.text);
          setStatus('success');
          e.target.reset();
          setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
          console.log(error.text);
          setStatus('error');
          setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in <span className="text-emerald-400">Touch</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions about your portfolio? Our team is here to help you navigate your investment journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <FiMail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email Us</p>
                    <p className="text-white font-medium">support@novainvest.com</p>
                    <p className="text-white font-medium">invest@novainvest.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                    <FiMapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Visit Us</p>
                    <p className="text-white font-medium">100 Innovation Drive</p>
                    <p className="text-white font-medium">Silicon Valley, CA 94025</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                    <FiPhone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Call Us</p>
                    <p className="text-white font-medium">+1 (555) 123-4567</p>
                    <p className="text-gray-500 text-sm">Mon-Fri from 8am to 5pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[FiTwitter, FiLinkedin, FiInstagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="user_name" className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                  <input
                    name="user_name"
                    id="user_name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="user_email" className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                  <input
                    name="user_email"
                    id="user_email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-300 ml-1">Subject</label>
                <input
                  name="subject"
                  id="subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  required
                  placeholder="Tell us more about your inquiry..."
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`mt-2 w-full font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 transform transition-all duration-300 flex items-center justify-center gap-2
                  ${status === 'sending' ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 hover:-translate-y-0.5 text-white'}
                  ${status === 'success' ? 'bg-green-600 hover:bg-green-500' : ''}
                  ${status === 'error' ? 'bg-red-600 hover:bg-red-500' : ''}
                `}
              >
                {status === 'idle' && (
                  <>
                    <span>Send Message</span>
                    <FiSend className="w-5 h-5" />
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <span>Sending...</span>
                    <FiLoader className="w-5 h-5 animate-spin" />
                  </>
                )}
                {status === 'success' && (
                  <>
                    <span>Message Sent!</span>
                    <FiCheckCircle className="w-5 h-5" />
                  </>
                )}
                {status === 'error' && (
                  <>
                    <span>Failed to Send</span>
                    <FiAlertCircle className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
