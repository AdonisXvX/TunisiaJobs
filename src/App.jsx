import React, { useState } from 'react';
import './App.css';
import Header from './header';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import Pricing from './Pricing';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    image: null
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStep, setSelectedStep] = useState(0);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ name: '', email: '', password: '', image: null });
    setShowDropdown(false);
    setCurrentPage('home');
  };

  // Video URLs for each step (replace with your actual video URLs)
  const stepVideos = [
    'https://www.w3schools.com/html/mov_bbb.mp4', // Create Profile
    'https://www.w3schools.com/html/movie.mp4',     // Browse Jobs
    'https://www.w3schools.com/html/mov_bbb.mp4', // Apply Easily
    'https://www.w3schools.com/html/movie.mp4'      // Get Hired
  ];

  const steps = [
    {
      number: 1,
      title: 'Create Profile',
      description: 'Sign up and build your professional profile with your skills and experience',
      emoji: '📝'
    },
    {
      number: 2,
      title: 'Browse Jobs',
      description: 'Search through thousands of job listings from top Tunisian companies',
      emoji: '🔍'
    },
    {
      number: 3,
      title: 'Apply Easily',
      description: 'Submit your application with one click and track your progress',
      emoji: '📤'
    },
    {
      number: 4,
      title: 'Get Hired',
      description: 'Connect with employers and land your dream job in Tunisia',
      emoji: '🎉'
    }
  ];

  // Route to Sign In page
  if (currentPage === 'signin') {
    return (
      <SignIn 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setIsLoggedIn={setIsLoggedIn}
        setUserData={setUserData}
        isLoggedIn={isLoggedIn}
        userData={userData}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        handleLogout={handleLogout}
      />
    );
  }

  // Route to Dashboard page
  if (currentPage === 'dashboard') {
    return (
      <Dashboard 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userData={userData}
        isLoggedIn={isLoggedIn}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        handleLogout={handleLogout}
      />
    );
  }

  // Route to Pricing page
  if (currentPage === 'pricing') {
    return (
      <Pricing 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        userData={userData}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        handleLogout={handleLogout}
      />
    );
  }

  // ============= LANDING PAGE =============
  return (
    <div className="app">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        userData={userData}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        handleLogout={handleLogout}
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              Find Your Dream Job in <span className="text-accent">Tunisia</span>
            </h1>
            <p className="hero-subtitle">
              Connect with top employers across Tunisia. Your next career opportunity is just a click away.
            </p>
            <button onClick={() => setCurrentPage('pricing')} className="btn-hero">
              Start Your Journey →
            </button>
          </div>

          {/* Stats Section */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🏢</div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💼</div>
              <div className="stat-number">2,000+</div>
              <div className="stat-label">Active Jobs</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✨</div>
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section with Videos */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`step-card-video ${selectedStep === index ? 'selected' : ''}`}
                onClick={() => setSelectedStep(index)}
                onMouseEnter={() => setSelectedStep(index)}
              >
                {/* Video Container */}
                <div className="video-container">
                  <video
                    className={`step-video ${selectedStep === index ? 'active' : ''}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={stepVideos[index]} type="video/mp4" />
                  </video>
                  
                  {/* Fallback Icon */}
                  <div className={`video-fallback ${selectedStep === index ? 'hidden' : ''}`}>
                    <span className="icon-emoji">{step.emoji}</span>
                  </div>

                  {/* Step Number Badge */}
                  <div className={`step-number-badge step-number-badge-${index + 1} ${selectedStep === index ? 'active' : ''}`}>
                    {step.number}
                  </div>

                  {/* Play indicator */}
                  {selectedStep === index && (
                    <div className="play-indicator"></div>
                  )}
                </div>

                {/* Content */}
                <div className="step-content">
                  <h3 className={`step-title ${selectedStep === index ? 'active' : ''}`}>
                    {step.title}
                  </h3>
                  <p className="step-description">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="progress-indicators">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedStep(index)}
                className={`progress-dot ${selectedStep === index ? 'active' : ''}`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose TunisiaJobs?</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🇹🇳</div>
              <h3 className="feature-title">Local Focus</h3>
              <p className="feature-description">
                Exclusively focused on the Tunisian job market with local companies and opportunities
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Fast & Easy</h3>
              <p className="feature-description">
                Simple application process with instant notifications for new opportunities
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure</h3>
              <p className="feature-description">
                Your data is protected with industry-standard security measures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Career Journey?</h2>
            <p className="cta-subtitle">
              Join thousands of job seekers who found their dream job through TunisiaJobs
            </p>
            <button onClick={() => setCurrentPage('pricing')} className="btn-cta">
              Get Started Now →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">© 2024 TunisiaJobs. Made with ❤️ in Tunisia</p>
        </div>
      </footer>
    </div>
  );
};

export default App;