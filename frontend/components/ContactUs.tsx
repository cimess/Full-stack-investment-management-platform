import React, { useState, useRef } from 'react';
import { FiSend, FiMail, FiTwitter, FiLinkedin, FiInstagram, FiLoader, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { contactUsAPI } from '../services/queryServices';
import { toast, Zoom } from 'react-toastify';

function ContactUs() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: '',
  });

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.user_name || !formData.user_email || !formData.subject || !formData.message) return;
    setStatus('sending');

    const data = {
      user_name: formData.user_name,
      user_email: formData.user_email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const result = await contactUsAPI(data);
      console.log(result)
      if (result.success) {
        setStatus('success');
        toast.success(result.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Zoom,
        });
     setFormData({
      user_name: '',
      user_email: '',
      subject: '',
      message: '',
     })
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        toast.error("Failed to send email. Please try again later.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Zoom,
        });
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/[0.03] rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">Get in <span className="premium-text-gradient">Touch</span></h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Ready to upgrade your investment operation? Contact our institutional support team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="premium-card p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
              <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white">
                    <FiMail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1 font-mono uppercase tracking-widest">Email Us</p>
                    <a className="text-white font-medium text-lg hover:underline" href="mailto:noreply@cimessinvest.com">noreply@cimessinvest.com</a>
                  </div>
                </div>
                {/* Additional contact methods (like Address) can be injected here later */}
              </div>
            </div>

            <div className="flex gap-4">
              {[{ Icon: FiTwitter, link: "" }, { Icon: FiLinkedin, link: "" }, { Icon: FiInstagram, link: "" }].map((Icon, index) => (
                <a
                  key={index}
                  href={Icon.link}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Icon.Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="premium-card p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
            <form onSubmit={sendEmail} className="flex flex-col gap-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="user_name" className="premium-label ml-1 text-slate-400">Full Name</label>
                  <input
                    name="user_name"
                    id="user_name"
                    type="text"
                    required
                    value={formData.user_name}
                    onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-black border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-slate-700 focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="user_email" className="premium-label ml-1 text-slate-400">Email Address</label>
                  <input
                    name="user_email"
                    id="user_email"
                    type="email"
                    value={formData.user_email}
                    onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-black border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-slate-700 focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="subject" className="premium-label ml-1 text-slate-400">Subject</label>
                <input
                  name="subject"
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  placeholder="How can we help?"
                  className="w-full bg-black border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-slate-700 focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="message" className="premium-label ml-1 text-slate-400">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="Tell us more about your inquiry..."
                  className="w-full bg-black border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-slate-700 focus:outline-none focus:border-emerald-500/50 transition-all font-medium resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`mt-4 w-full font-bold uppercase text-xs tracking-widest py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]
                  ${status === 'sending' ? 'bg-white/10 text-slate-500 cursor-not-allowed' : 'bg-white text-black hover:bg-slate-200'}
                  ${status === 'success' ? 'bg-emerald-500 text-black' : ''}
                  ${status === 'error' ? 'bg-red-500 text-white' : ''}
                `}
              >
                {status === 'idle' && (
                  <><span>Send Request</span><FiSend className="w-4 h-4" /></>
                )}
                {status === 'sending' && (
                  <><span>Processing...</span><FiLoader className="w-4 h-4 animate-spin" /></>
                )}
                {status === 'success' && (
                  <><span>Message Sent!</span><FiCheckCircle className="w-4 h-4" /></>
                )}
                {status === 'error' && (
                  <><span>Failed to Send</span><FiAlertCircle className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs;
