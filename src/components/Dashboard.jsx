import React from 'react';
import Logo from './logo.jsx';

const Dashboard = ({ onSelectSocial, onSelectDomain }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <Logo size="medium" />
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Select an Extractor</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our powerful AI-driven lead extraction tools to discover and connect with your ideal prospects.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Social Media Lead Extractor Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 animate-slideInLeft">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Social Media Lead Extractor</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Extract leads from various social media platforms including LinkedIn, Twitter, Facebook, and Instagram using advanced AI algorithms.
              </p>
              <div className="mb-6">
                <div className="flex justify-center space-x-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    LinkedIn
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                    Twitter
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Facebook
                  </span>
                </div>
                <p className="text-xs text-gray-500">Free Version Available</p>
              </div>
              <button
                onClick={onSelectSocial}
                className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold py-3 rounded-lg hover:from-green-500 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                Open Extractor
              </button>
            </div>
          </div>
          
          {/* Domain Lead Extractor Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 animate-slideInRight">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Domain Lead Extractor</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Extract comprehensive lead data directly from company domains and websites with detailed contact information and business insights.
              </p>
              <div className="mb-6">
                <div className="flex justify-center space-x-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Company Data
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                    Contact Info
                  </span>
                </div>
                <p className="text-xs text-gray-500">API Key Required</p>
              </div>
              <button
                onClick={onSelectDomain}
                className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold py-3 rounded-lg hover:from-green-500 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                Open Extractor
              </button>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-12 text-center">
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">AI-Powered</h4>
              <p className="text-sm text-gray-600">Advanced algorithms for accurate lead detection</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Automated</h4>
              <p className="text-sm text-gray-600">Streamlined process with minimal manual input</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Secure</h4>
              <p className="text-sm text-gray-600">Enterprise-grade security and data protection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;