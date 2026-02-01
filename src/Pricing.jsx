import React, { useState } from 'react';
import Header from './header';

const Pricing = ({ 
  currentPage,
  setCurrentPage,
  isLoggedIn,
  userData,
  showDropdown,
  setShowDropdown,
  handleLogout
}) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    d17Code: ''
  });

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '29',
      period: 'month',
      features: [
        'Apply to 10 jobs/month',
        'Basic profile',
        'Email notifications',
        'Mobile app access'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '59',
      period: 'month',
      features: [
        'Unlimited applications',
        'Featured profile',
        'Priority support',
        'Resume builder',
        'Job alerts',
        'Company insights'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '99',
      period: 'month',
      features: [
        'Everything in Premium',
        'Dedicated account manager',
        'Custom integrations',
        'Interview coaching',
        'Salary negotiation help',
        'Career counseling'
      ],
      popular: false
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPlan || !paymentMethod) {
      alert('Please select a plan and payment method');
      return;
    }
    
    alert(`Processing payment via ${paymentMethod === 'd17' ? 'D17' : 'PayPal'} for ${selectedPlan.name} plan...`);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

      <div className="pricing-page">
        <div className="container">
          <div className="pricing-header">
            <h1 className="pricing-title">Choose Your Plan</h1>
            <p className="pricing-subtitle">
              Select the perfect plan for your job search journey
            </p>
          </div>

          <div className="pricing-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card ${selectedPlan?.id === plan.id ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
                onClick={() => setSelectedPlan(plan)}
              >
                {plan.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}
                
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-period">TND/{plan.period}</span>
                  </div>
                </div>

                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <span className="feature-check">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="plan-button">
                  {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>

          {selectedPlan && (
            <div className="payment-form fade-in">
              <h2 className="form-title">Complete Your Payment</h2>

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="+216 XX XXX XXX"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Select Payment Method *</label>
                
                <div className="payment-methods">
                  <div
                    onClick={() => setPaymentMethod('d17')}
                    className={`payment-option ${paymentMethod === 'd17' ? 'selected' : ''}`}
                  >
                    <div className="payment-header">
                      <span className="payment-icon">💳</span>
                      <div className={`radio-button ${paymentMethod === 'd17' ? 'checked' : ''}`}>
                        {paymentMethod === 'd17' && <div className="radio-dot"></div>}
                      </div>
                    </div>
                    <h3 className="payment-name">D17</h3>
                    <p className="payment-description">Pay securely with your D17 code</p>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('paypal')}
                    className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}
                  >
                    <div className="payment-header">
                      <span className="payment-icon">🌐</span>
                      <div className={`radio-button ${paymentMethod === 'paypal' ? 'checked' : ''}`}>
                        {paymentMethod === 'paypal' && <div className="radio-dot"></div>}
                      </div>
                    </div>
                    <h3 className="payment-name">PayPal</h3>
                    <p className="payment-description">Fast and secure PayPal payment</p>
                  </div>
                </div>
              </div>

              {paymentMethod === 'd17' && (
                <div className="form-group fade-in">
                  <label className="form-label">D17 Code *</label>
                  <input
                    type="text"
                    name="d17Code"
                    required
                    value={formData.d17Code}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your D17 code"
                  />
                  <p className="form-hint">
                    ℹ️ Get your D17 code from any Tunisie Telecom agency or *844# USSD
                  </p>
                </div>
              )}

              <div className="order-summary">
                <h3 className="summary-title">Order Summary</h3>
                <div className="summary-content">
                  <div className="summary-row">
                    <span className="summary-label">Plan:</span>
                    <span className="summary-value">{selectedPlan.name}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Price:</span>
                    <span className="summary-value">{selectedPlan.price} TND/{selectedPlan.period}</span>
                  </div>
                  <div className="summary-row summary-total">
                    <span className="summary-label">Total:</span>
                    <span className="summary-value total-amount">{selectedPlan.price} TND</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!paymentMethod}
                className="submit-button"
              >
                Complete Payment →
              </button>

              <p className="security-note">
                🔒 Your payment information is secure and encrypted
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;