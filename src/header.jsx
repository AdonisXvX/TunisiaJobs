import React from 'react';

const Header = ({ 
  currentPage, 
  setCurrentPage, 
  isLoggedIn, 
  userData, 
  showDropdown, 
  setShowDropdown, 
  handleLogout 
}) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo" onClick={() => setCurrentPage('home')}>
            🇹🇳 TunisiaJobs
          </div>
          <nav className="nav-menu">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('pricing')}
              className={`nav-item ${currentPage === 'pricing' ? 'active' : ''}`}
            >
              Get Started
            </button>
          </nav>
        </div>

        <div className="header-right">
          {!isLoggedIn ? (
            <button 
              onClick={() => setCurrentPage('signin')}
              className="user-button"
            >
              <span className="user-icon">👤</span>
              <span className="user-text">Visitor</span>
            </button>
          ) : (
            <div className="logged-in-section">
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className="dashboard-btn"
              >
                Dashboard
              </button>
              <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
                {userData.image ? (
                  <img src={userData.image} alt={userData.name} className="user-avatar" />
                ) : (
                  <div className="user-avatar-placeholder">
                    {userData.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="user-name">{userData.name}</span>
                <span className="dropdown-arrow">▼</span>
              </div>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button 
                    onClick={() => { 
                      setCurrentPage('dashboard'); 
                      setShowDropdown(false); 
                    }} 
                    className="dropdown-item"
                  >
                    📊 Dashboard
                  </button>
                  <button 
                    onClick={() => { 
                      setCurrentPage('profile'); 
                      setShowDropdown(false); 
                    }} 
                    className="dropdown-item"
                  >
                    👤 Profile
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className="dropdown-item logout"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;