import React, { useState } from 'react';
import Header from './header';

const SignIn = ({ 
  currentPage,
  setCurrentPage, 
  setIsLoggedIn, 
  setUserData,
  isLoggedIn,
  userData,
  showDropdown,
  setShowDropdown,
  handleLogout
}) => {
  const [authFormData, setAuthFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setAuthFormData({ ...authFormData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && !authFormData.name) {
      alert('Please enter your name');
      return;
    }
    setUserData(authFormData);
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  return (
    <div className="auth-page">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        userData={userData}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        handleLogout={handleLogout}
      />
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="auth-subtitle">
            {isSignUp ? 'Sign up to get started' : 'Sign in to continue'}
          </p>

          <div className="image-upload-section">
            <div className="image-preview-container">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <div className="image-placeholder">
                  <span className="camera-icon">📷</span>
                  <span>Upload Photo</span>
                </div>
              )}
            </div>
            <label className="image-upload-btn">
              Choose Image
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <div className="auth-form">
            {isSignUp && (
              <div className="form-field">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={authFormData.name}
                  onChange={(e) => setAuthFormData({ ...authFormData, name: e.target.value })}
                />
              </div>
            )}

            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={authFormData.email}
                onChange={(e) => setAuthFormData({ ...authFormData, email: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={authFormData.password}
                onChange={(e) => setAuthFormData({ ...authFormData, password: e.target.value })}
              />
            </div>

            <button onClick={handleAuthSubmit} className="auth-submit-btn">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>

            <div className="auth-switch">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button onClick={() => setIsSignUp(!isSignUp)} className="switch-btn">
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;