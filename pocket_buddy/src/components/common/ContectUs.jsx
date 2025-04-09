import React, { useState } from 'react'
import "../../assets/contect.css"

export const ContectUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });

      const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill in all fields.');
      return;
    }

    // Optionally, you can send formData to your backend or email service
    console.log('Form submitted:', formData);
    setStatus('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='contact'>
    <section className="contact-section">
      <h2>Contact Us</h2>
      <p>If you have questions, feedback, or issues, we'd love to hear from you!</p>

      <div className="contact-cards">
        <div className="card">
          <h3>For Users</h3>
          <p>Email: support@pocketbuddy.com</p>
          <p>Need help finding or reviewing offers? Reach out!</p>
        </div>
        <div className="card">
          <h3>For Restaurant Owners</h3>
          <p>Email: owners@pocketbuddy.com</p>
          <p>Questions about managing offers or your restaurant profile?</p>
        </div>
        <div className="card">
          <h3>For Admin Support</h3>
          <p>Email: admin@pocketbuddy.com</p>
          <p>Report critical issues, violations, or disputes.</p>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Send Us a Message</h3>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Send Message</button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
    </div>
  )
}
