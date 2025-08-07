import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function AuthForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    termsAccepted: false
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between signup and signin

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (isSignUp) {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      setMessage('Please accept the terms and conditions.');
      return;
    }

    try {
      const response = await axios.post('http://localhost/hrm/register.php', formData);
      if (response.data.success) {
        setMessage(`Welcome, ${formData.name}! Signup successful.`);
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          termsAccepted: false
        });
        // Switch to login form after signup
        setTimeout(() => {
          setMessage('');
          setIsSignUp(false);
        }, 2000);
      } else {
        setMessage(response.data.message || 'Signup failed.');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      setMessage('Server error. Please try again.');
    }
  };

  const handleLoginSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost/hrm/login.php', loginData);
    if (response.data.success) {
      setMessage('Login successful!');
      setTimeout(() => {
        navigate('../hrms'); // 👈 Redirect to dashboard
      }, 1000);
    } else {
      setMessage(response.data.message || 'Login failed.');
    }
  } catch (error) {
    console.error('Login Error:', error);
    setMessage('Server error. Please try again.');
  }
};


  return (
    <div className="container">
      <div className="left-panel">
        <div className="logo">
          <img src="/logo.png" alt="Emplync Logo" height="40" />
          <h2>Emplync System</h2>
        </div>
        <h1>Complete HRMS Solution for Modern Workplaces</h1>
        <ul>
          <li>✅ Manage employee records & departments easily</li>
          <li>✅ Track attendance, leaves & holidays in real time</li>
          <li>✅ Simplified payroll & salary generation</li>
          <li>✅ Approve and manage employee requests seamlessly</li>
          <li>✅ Generate detailed HR reports & analytics</li>
        </ul>
      </div>

      <div className="right-panel">
        {isSignUp ? (
          <>
            <h3>30-day free trial.</h3>
            <p>No credit card required. Cancel anytime.</p>
            <form onSubmit={handleSignupSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password *"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="phone-input">
                <span>+91</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="terms">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
              </div>
              <button type="submit" className="signup-btn">FREE SIGN UP</button>
              <p className="toggle-form">Already have an account? <span onClick={() => setIsSignUp(false)}>Sign in</span></p>
            </form>
          </>
        ) : (
          <>
            <h3>Sign In to Emplync</h3>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="signup-btn">SIGN IN</button>
              <p className="toggle-form">Don't have an account? <span onClick={() => setIsSignUp(true)}>Sign up</span></p>
            </form>
          </>
        )}

        {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}

        <div className="social-login">
          <p>or continue with</p>
          <div className="icons">
            <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" />
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" />
            <img src="https://cdn-icons-png.flaticon.com/512/732/732221.png" alt="Microsoft" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
