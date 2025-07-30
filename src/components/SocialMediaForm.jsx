// 


import React, { useState } from 'react';
import SocialMediaResults from './SocialMediaResults.jsx';

// Simple Arrow Left icon as SVG component
const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const SocialMediaForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    profession: '',
    location: '',
    domain: '',
    results: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [resultData, setResultData] = useState(null);
  const [submissionTime, setSubmissionTime] = useState(null);

  // Webhook URL
  const WEBHOOK_URL = 'https://n8n.srv915056.hstgr.cloud/webhook/socialdata';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
    if (submitStatus) {
      setSubmitStatus(null);
      setResultData(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.profession.trim()) newErrors.profession = 'Please specify who you are looking for';
    if (!formData.location.trim()) newErrors.location = 'Please enter a location';
    if (!formData.domain) newErrors.domain = 'Please select a platform';
    if (!formData.results) newErrors.results = 'Please select number of results';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDomainForWebhook = (platform) => {
    const domainMap = {
      'linkedin': 'linkedin.com',
      'twitter': 'twitter.com',
      'facebook': 'facebook.com',
      'instagram': 'instagram.com'
    };
    return domainMap[platform] || platform;
  };

  const handleNewSearch = () => {
    setFormData({ profession: '', location: '', domain: '', results: '' });
    setSubmitStatus(null);
    setResultData(null);
    setSubmissionTime(null);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setResultData(null);
    const startTime = new Date();
    
    try {
      const webhookData = {
        profession: formData.profession.trim(),
        location: formData.location.trim(),
        domain: formatDomainForWebhook(formData.domain),
        results: parseInt(formData.results),
        platform: formData.domain,
        timestamp: new Date().toISOString(),
        formType: 'social_media'
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        const responseData = await response.json();
        const endTime = new Date();
        const duration = Math.round((endTime - startTime) / 1000);
        setSubmissionTime(duration);
        setResultData(responseData);
        setSubmitStatus('success');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending data to webhook:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success' && resultData) {
    return (
      <SocialMediaResults
        resultData={resultData}
        formData={formData}
        submissionTime={submissionTime}
        onBack={onBack}
        onNewSearch={handleNewSearch}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 animate-slideIn">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            disabled={isSubmitting}
          >
            <ArrowLeftIcon />
          </button>
          <div className="flex-1 title-subtitle-container">
            <h1 className="font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent leading-tight" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>All In One Lead Scraper</h1>
            <p className="text-gray-500 text-sm sm:text-base">Find leads from social media platforms</p>
          </div>
        </div>
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
             <p className="text-sm font-medium text-red-800">
                Failed to submit request. Please check your connection and try again.
              </p>
          </div>
        )}
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Who are you looking for? *</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              placeholder="e.g., Dentist, Software Developer"
              className={`w-full px-4 py-3 border rounded-lg text-black bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${errors.profession ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {errors.profession && <p className="text-red-500 text-sm">{errors.profession}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Pune, Mumbai, Delhi"
              className={`w-full px-4 py-3 border rounded-lg text-black bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Platform *</label>
            <select 
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${errors.domain ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            >
              <option value="">Select a platform</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter (X)</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </select>
            {errors.domain && <p className="text-red-500 text-sm">{errors.domain}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Number of Results *</label>
            <select 
              name="results"
              value={formData.results}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${errors.results ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            >
              <option value="">Select number of results</option>
              <option value="10">10 Results</option>
              <option value="25">25 Results</option>
              <option value="50">50 Results</option>
              <option value="100">100 Results</option>
            </select>
            {errors.results && <p className="text-red-500 text-sm">{errors.results}</p>}
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold py-3 rounded-lg hover:from-green-500 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Extracting...
              </div>
            ) : (
              'Start Lead Extraction'
            )}
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col items-center">
          <p className="text-sm text-gray-500">
            Form automated with <span className="text-teal-600 font-semibold">Brainmine.AI</span>
          </p>
          <div className="flex mt-3 space-x-4 text-xs text-gray-400">
            <span>✓ GDPR Compliant</span>
            <span>✓ Data Secure</span>
            <span>✓ Real-time Results</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaForm;