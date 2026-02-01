import React, { useState } from 'react';
import Header from './header';
import Jobs from './jobs';

const Dashboard = ({ 
  currentPage,
  setCurrentPage,
  userData,
  isLoggedIn,
  showDropdown,
  setShowDropdown,
  handleLogout
}) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Mock data - Replace with actual data from your database/API
  const hasPaidPlan = false; // Check if user has an active subscription
  const hasUploadedResume = false; // Check if user has uploaded resume

  return (
    <div className="dashboard-page">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        userData={userData}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        handleLogout={handleLogout}
      />
      <div className="dashboard-container">
        <aside className="sidebar">
          <button className="new-btn">+ New</button>
          <nav className="sidebar-nav">
            <button 
              className={`sidebar-item ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              <span className="sidebar-icon">🏠</span>
              Dashboard
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'resumes' ? 'active' : ''}`}
              onClick={() => setActiveSection('resumes')}
            >
              <span className="sidebar-icon">📄</span>
              Resumes
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'coverletters' ? 'active' : ''}`}
              onClick={() => setActiveSection('coverletters')}
            >
              <span className="sidebar-icon">✉️</span>
              Cover Letters
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'jobs' ? 'active' : ''}`}
              onClick={() => setActiveSection('jobs')}
            >
              <span className="sidebar-icon">💼</span>
              Jobs
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveSection('applications')}
            >
              <span className="sidebar-icon">📋</span>
              Applications
            </button>
          </nav>
          <div className="sidebar-footer">
            <button className="sidebar-item">
              <span className="sidebar-icon">👤</span>
              {userData.name.split(' ')[0] || 'User'}
            </button>
          </div>
        </aside>

        <main className="main-content">
          {/* Dashboard Overview Section */}
          {activeSection === 'dashboard' && (
            <>
              <section className="dashboard-section">
                <div className="section-header">
                  <h2>Resumes</h2>
                  <button className="view-all-btn" onClick={() => setActiveSection('resumes')}>→</button>
                </div>
                <div className="cards-grid">
                  <div className="create-card">
                    <div className="create-card-content">
                      <span className="create-icon">+</span>
                      <p>Create new resume</p>
                    </div>
                  </div>
                  <div className="document-card">
                    <div className="document-preview">
                      <div className="document-header">Curriculum vitae</div>
                      <div className="document-content"></div>
                      <div className="document-footer"></div>
                    </div>
                    <div className="document-info">
                      <h3>CV sans titre</h3>
                      <p className="document-date">Edited 18 days ago</p>
                    </div>
                    <button className="more-btn">⋮</button>
                  </div>
                </div>
              </section>

              <section className="dashboard-section">
                <div className="section-header">
                  <h2>Cover Letters</h2>
                  <button className="view-all-btn" onClick={() => setActiveSection('coverletters')}>→</button>
                </div>
                <div className="cards-grid">
                  <div className="create-card">
                    <div className="create-card-content">
                      <span className="create-icon">+</span>
                      <p>Create new cover letter</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="dashboard-section">
                <div className="section-header">
                  <h2>Jobs</h2>
                  <button className="view-all-btn" onClick={() => setActiveSection('jobs')}>→</button>
                </div>
                <div className="empty-state">
                  <p>Click "Jobs" to search for opportunities</p>
                </div>
              </section>

              <section className="dashboard-section">
                <div className="section-header">
                  <h2>Applications</h2>
                  <button className="view-all-btn" onClick={() => setActiveSection('applications')}>→</button>
                </div>
                <div className="add-application">
                  <button className="add-btn">+ Add application</button>
                </div>
              </section>
            </>
          )}

          {/* Resumes Section */}
          {activeSection === 'resumes' && (
            <section className="dashboard-section">
              <div className="section-header">
                <h2>Resumes</h2>
              </div>
              <div className="cards-grid">
                <div className="create-card">
                  <div className="create-card-content">
                    <span className="create-icon">+</span>
                    <p>Create new resume</p>
                  </div>
                </div>
                <div className="document-card">
                  <div className="document-preview">
                    <div className="document-header">Curriculum vitae</div>
                    <div className="document-content"></div>
                    <div className="document-footer"></div>
                  </div>
                  <div className="document-info">
                    <h3>CV sans titre</h3>
                    <p className="document-date">Edited 18 days ago</p>
                  </div>
                  <button className="more-btn">⋮</button>
                </div>
              </div>
            </section>
          )}

          {/* Cover Letters Section */}
          {activeSection === 'coverletters' && (
            <section className="dashboard-section">
              <div className="section-header">
                <h2>Cover Letters</h2>
              </div>
              <div className="cards-grid">
                <div className="create-card">
                  <div className="create-card-content">
                    <span className="create-icon">+</span>
                    <p>Create new cover letter</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Jobs Section */}
          {activeSection === 'jobs' && (
            <Jobs 
              userData={userData}
              hasPaidPlan={hasPaidPlan}
              hasUploadedResume={hasUploadedResume}
            />
          )}

          {/* Applications Section */}
          {activeSection === 'applications' && (
            <section className="dashboard-section">
              <div className="section-header">
                <h2>Applications</h2>
              </div>
              <div className="add-application">
                <button className="add-btn">+ Add application</button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;