import React, { useState } from 'react';
import Logo from './logo.jsx';

// Simple Eye icons as SVG components
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const LoginPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded credentials
  const VALID_EMAIL = 'sales@brainmine.ai';
  const VALID_PASSWORD = 'Sales@4321#';

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      if (loginData.email === VALID_EMAIL && loginData.password === VALID_PASSWORD) {
        onLogin();
      } else {
        alert('Invalid credentials. Please use Valid Email address and Password');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center animate-fadeIn" style={{ backgroundImage: 'url(/03.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center justify-center transform transition-all duration-500 hover:shadow-2xl translate-x-20 md:translate-x-48">
        <Logo size="large" />
        
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Brainmine.AI</h1>
        <p className="text-gray-600 text-center mb-8">Please enter your credentials to log in.</p>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Email Address</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="abc@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 text-black bg-white placeholder-gray-400"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              placeholder="********"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 pr-12 text-black"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-700 transition-colors bg-transparent p-0 border-none shadow-none focus:outline-none"
                style={{ background: 'none' }}
                disabled={isLoading}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold py-3 rounded-lg hover:from-green-500 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;