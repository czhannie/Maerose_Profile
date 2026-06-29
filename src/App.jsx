import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeLink, setActiveLink] = useState('#about'); // Track active state

  // State for form handling
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkMode);
  }, [isDarkMode]);

  // Handle Form Submission to Backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Sending...');

    try {
      const response = await fetch('https://maerose-profile.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clears the form
      } else {
        setFormStatus('Failed to send message.');
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setFormStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="site-wrapper">
      {/* STICKY HEADER */}
      <header className="site-header">
        <nav className="main-nav">
          <div className="logo">MJC</div>
          
          <div className="nav-links">
            <a href="#about" 
               className={activeLink === '#about' ? 'active' : ''} 
               onClick={() => setActiveLink('#about')}>ABOUT</a>
            <a href="#hobbies" 
               className={activeLink === '#hobbies' ? 'active' : ''} 
               onClick={() => setActiveLink('#hobbies')}>PASSIONS</a>
            <a href="#projects" 
               className={activeLink === '#projects' ? 'active' : ''} 
               onClick={() => setActiveLink('#projects')}>PROJECTS</a>
            <a href="#contact" 
               className={activeLink === '#contact' ? 'active' : ''} 
               onClick={() => setActiveLink('#contact')}>CONTACT</a>
          </div>
          
          <button className="theme-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="profile-container">
        <div className="profile-img-wrapper">
          <img src="/profile.jpg" alt="Portrait of Maerose Boadilla" className="profile-img" />
        </div>

        <h1 className="name-heading">Maerose Joscel Czarinah V. Boadilla</h1>
        <div className="subtitle">4th-Year Computer Science Student</div>

        <h2 id="about" className="section-title">Who I Am</h2>
        <p>Hello! I am <strong>Maerose Joscel Czarinah V. Boadilla</strong>. To the academic world, I am a dedicated 4th-year Computer Science student at Don Mariano Marcos Memorial State University. But beyond the syntax and semicolons, I am a strategist and a dreamer.</p>
        <p>My life is a balance between two worlds: the structured logic of <strong>Chess</strong> and the boundless imagination found in <strong>Wattpad</strong> and <strong>Asian Dramas</strong>. I believe that being a great developer isn't just about writing code—it's about having the patience of a chess player and the creativity of a storyteller.</p>

        <blockquote>
          "Life is like a game of chess. To win you have to make a move."
        </blockquote>

        <h2 id="hobbies" className="section-title">Passions & Pursuits</h2>
        <ul className="hobbies-grid">
          <li className="hobbies-card">
            <span className="hobbies-title">Strategy</span>
            <span className="hobbies-desc">Chess & Gaming</span>
          </li>
          <li className="hobbies-card">
            <span className="hobbies-title">Narratives</span>
            <span className="hobbies-desc">Wattpad & Media</span>
          </li>
          <li className="hobbies-card">
            <span className="hobbies-title">Digital Craft</span>
            <span className="hobbies-desc">Web Development</span>
          </li>
          <li className="hobbies-card">
            <span className="hobbies-title">Logic</span>
            <span className="hobbies-desc">Assembly & Code</span>
          </li>
        </ul>

        {/* UPDATED: Card-Based Project Showcase */}
        <h2 id="projects" className="section-title">Selected Works</h2>
        <div className="project-cards-container">
          
          <div className="project-card">
            <h3>AlayAkap</h3>
            <div className="card-divider"></div>
            <p>A web-based donation management system designed to track donation drives and contributions in real-time, ensuring community transparency and efficiency.</p>
            <div className="project-tech">HTML • CSS • JavaScript</div>
          </div>

          <div className="project-card">
            <h3>Automated Barangay Certification System</h3>
            <div className="card-divider"></div>
            <p>A database-driven local governance application built to streamline resident record management and fully automate the issuance of official certificates.</p>
            <div className="project-tech">Microsoft Access</div>
          </div>

          <div className="project-card">
            <h3>Automated Pet Feeder</h3>
            <div className="card-divider"></div>
            <p>A WiFi-enabled IoT hardware solution utilizing Arduino technology to provide consistent, automated feeding schedules for modern pet owners.</p>
            <div className="project-tech">Arduino • IoT • Hardware</div>
          </div>

          <div className="project-card">
            <h3>Digital Portfolio</h3>
            <div className="card-divider"></div>
            <p>A dynamic, responsive digital scrapbook featuring custom dark mode theming, smooth navigation, and a modern component-based architecture.</p>
            <div className="project-tech">React • Vercel • CSS</div>
            <a href="https://thefolio-nine.vercel.app/?authuser=1" target="_blank" rel="noopener noreferrer" className="project-link">Explore Portfolio ↗</a>
          </div>

        </div>

        {/* CONTACT SECTION WITH INBOX & UPLOAD */}
        <h2 id="contact" className="section-title">Get In Touch</h2>
        <p>Have a question about my projects or want to recommend a new K-Drama? My inbox is always open.</p>
        
        <form className="contact-form" onSubmit={handleFormSubmit}>
          <div className="form-row">
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              className="form-input" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              required 
              className="form-input" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <textarea 
            placeholder="Write your message here..." 
            rows="4" 
            required 
            className="form-textarea"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
          
          <button type="submit" className="btn submit-btn">Send Message</button>

          {/* Success/Error Message Display */}
          {formStatus && <p style={{ marginTop: '15px', color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 'bold' }}>{formStatus}</p>}
        </form>

        <h3 className="contact-subtitle">Direct Contact</h3>
        <ul className="contact-list">
          <li><strong>Email</strong> <span>mjcboadilla23100543@student.dmmmsu.edu.ph</span></li>
          <li><strong>Location</strong> <span>La Union, Philippines</span></li>
          <li><strong>Contact No.</strong> <span>+63 912 345 6789</span></li>
        </ul>
      </main>

      {/* FOOTER */}
      <footer>
        <p>&copy; 2026 Maerose Joscel Czarinah Boadilla. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;