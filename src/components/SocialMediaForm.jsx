import React, { useState } from 'react';
import SocialMediaResults from './SocialMediaResults.jsx';

// Simple Arrow Left icon as SVG component
const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12,19 5,12 12,5"/>
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
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear previous submit status
    if (submitStatus) {
      setSubmitStatus(null);
      setResultData(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.profession.trim()) {
      newErrors.profession = 'Please specify who you are looking for';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Please enter a location';
    }
    
    if (!formData.domain) {
      newErrors.domain = 'Please select a platform';
    }
    
    if (!formData.results) {
      newErrors.results = 'Please select number of results';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Format domain to include .com extension
  const formatDomainForWebhook = (platform) => {
    const domainMap = {
      'linkedin': 'linkedin.com',
      'twitter': 'twitter.com',
      'facebook': 'facebook.com',
      'instagram': 'instagram.com'
    };
    return domainMap[platform] || platform;
  };

  // Reset form to start new search
  const handleNewSearch = () => {
    setFormData({ profession: '', location: '', domain: '', results: '' });
    setSubmitStatus(null);
    setResultData(null);
    setSubmissionTime(null);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setResultData(null);
    const startTime = new Date();
    
    try {
      // Prepare data for webhook
      const webhookData = {
        profession: formData.profession.trim(),
        location: formData.location.trim(),
        domain: formatDomainForWebhook(formData.domain),
        results: parseInt(formData.results),
        platform: formData.domain,
        timestamp: new Date().toISOString(),
        formType: 'social_media'
      };

      console.log('Sending data to webhook:', webhookData);

      // Send data to webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Webhook response:', responseData);
        
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

  // If we have results, show the results component
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

  // Show form if no results yet
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 animate-slideIn">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="mr-4 p-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
              disabled={isSubmitting}
            >
              <ArrowLeftIcon />
            </button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">All In One Lead Scrapper (Free Version)</h1>
              <p className="text-gray-600 mt-2">Get leads from social media platforms using free APIs</p>
            </div>
          </div>
          
          {/* Status Messages */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    Failed to submit request. Please check your network connection and try again.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Who are you looking for? *
              </label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                placeholder="e.g., Dentist, Software Developer, Marketing Manager"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${
                  errors.profession ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.profession && (
                <p className="text-red-500 text-sm">{errors.profession}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., pune, mumbai, delhi"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Platform *
              </label>
              <select 
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${
                  errors.domain ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select a platform</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter (X)</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
              </select>
              {errors.domain && (
                <p className="text-red-500 text-sm">{errors.domain}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Number of Results *
              </label>
              <select 
                name="results"
                value={formData.results}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${
                  errors.results ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select number of results</option>
                <option value="10">10 Results</option>
                <option value="25">25 Results</option>
                <option value="50">50 Results</option>
                <option value="100">100 Results</option>
              </select>
              {errors.results && (
                <p className="text-red-500 text-sm">{errors.results}</p>
              )}
            </div>
            
            {/* Preview Section */}
            {formData.profession && formData.location && formData.domain && (
              <div className="bg-gray-50 rounded-lg p-4 border">
                <h4 className="font-medium text-gray-800 mb-2">Search Preview:</h4>
                <p className="text-sm text-gray-600">
                  Looking for <span className="font-medium text-teal-600">{formData.profession}</span> in{' '}
                  <span className="font-medium text-teal-600">{formData.location}</span> on{' '}
                  <span className="font-medium text-teal-600">{formatDomainForWebhook(formData.domain)}</span>
                  {formData.results && (
                    <>
                      {' '}• <span className="font-medium text-teal-600">{formData.results} results</span>
                    </>
                  )}
                </p>
              </div>
            )}
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold py-3 rounded-lg hover:from-green-500 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Extracting Leads...
                </div>
              ) : (
                'Start Lead Extraction'
              )}
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              Form automated with <span className="text-teal-600 font-semibold">Brainmine.AI</span>
            </p>
            <div className="flex justify-center mt-4 space-x-4 text-xs text-gray-400">
              <span>✓ GDPR Compliant</span>
              <span>✓ Data Secure</span>
              <span>✓ Real-time Results</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaForm;