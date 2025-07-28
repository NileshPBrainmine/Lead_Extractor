import React, { useState } from 'react';
import DomainSearchResults from './DomainSearchResults.jsx';

// Simple Arrow Left icon as SVG component
const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12,19 5,12 12,5"/>
  </svg>
);

const DomainForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    domain: '',
    results: '',
    apiKey: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [resultData, setResultData] = useState(null);
  const [submissionTime, setSubmissionTime] = useState(null);

  // Webhook URL
  const WEBHOOK_URL = 'https://n8n.srv915056.hstgr.cloud/webhook/domainsearch';

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

  const validateDomain = (domain) => {
    const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    const urlPattern = /^https?:\/\//;
    
    // Remove protocol if present
    const cleanDomain = domain.replace(urlPattern, '').replace(/\/.*$/, '');
    
    return domainPattern.test(cleanDomain) || domain.includes('.');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.domain.trim()) {
      newErrors.domain = 'Please enter a domain name';
    } else if (!validateDomain(formData.domain)) {
      newErrors.domain = 'Please enter a valid domain (e.g., example.com)';
    }
    
    if (!formData.results) {
      newErrors.results = 'Please select number of results';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clean and format domain for webhook
  const formatDomainForWebhook = (domain) => {
    // Remove protocol and trailing slashes
    let cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    
    // Convert to lowercase
    cleanDomain = cleanDomain.toLowerCase();
    
    return cleanDomain;
  };

  // Reset form to start new search
  const handleNewSearch = () => {
    setFormData({ domain: '', results: '', apiKey: '' });
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
        domain: formatDomainForWebhook(formData.domain),
        results: parseInt(formData.results),
        apiKey: formData.apiKey.trim() || null,
        originalDomain: formData.domain.trim(),
        timestamp: new Date().toISOString(),
        formType: 'domain_search'
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
        let responseData;
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          responseData = await response.json();
        } else {
          // Handle non-JSON response
          const textResponse = await response.text();
          console.log('Non-JSON response:', textResponse);
          throw new Error('Invalid response format from server');
        }
        
        console.log('Webhook response:', responseData);
        
        // Ensure we have valid data before setting state
        if (responseData && (Array.isArray(responseData) || typeof responseData === 'object')) {
          const endTime = new Date();
          const duration = Math.round((endTime - startTime) / 1000);
          
          setSubmissionTime(duration);
          setResultData(responseData);
          setSubmitStatus('success');
        } else {
          throw new Error('Invalid response data format');
        }
        
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
  if (submitStatus === 'success' && resultData && Array.isArray(resultData)) {
    return (
      <DomainSearchResults
        resultData={resultData}
        formData={formData}
        submissionTime={submissionTime}
        onBack={onBack}
        onNewSearch={handleNewSearch}
      />
    );
  }

  const formatDomain = (domain) => {
    return domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  };

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
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Domain Lead Extractor</h1>
              <p className="text-gray-600 mt-2">Extract Lead Using Company Domain</p>
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
                Domain Name *
              </label>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                placeholder="e.g., brainmine.ai, example.com, paytm.com"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${
                  errors.domain ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.domain && (
                <p className="text-red-500 text-sm">{errors.domain}</p>
              )}
              <p className="text-xs text-gray-500">
                Enter domain with or without protocol (http/https)
              </p>
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
                <option value="500">500 Results</option>
              </select>
              {errors.results && (
                <p className="text-red-500 text-sm">{errors.results}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                API KEY
                <span className="text-xs text-gray-500 ml-2">(Optional for enhanced results)</span>
              </label>
              <input
                type="password"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleInputChange}
                placeholder="Please Enter Your API Key"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-500">
                API key enables premium features and higher rate limits
              </p>
            </div>
            
            {/* Preview Section */}
            {formData.domain && formData.results && (
              <div className="bg-gray-50 rounded-lg p-4 border">
                <h4 className="font-medium text-gray-800 mb-2">Extraction Preview:</h4>
                <p className="text-sm text-gray-600">
                  Extracting <span className="font-medium text-teal-600">{formData.results} leads</span> from{' '}
                  <span className="font-medium text-teal-600">{formatDomainForWebhook(formData.domain)}</span>
                  {formData.apiKey && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Premium Mode
                    </span>
                  )}
                </p>
              </div>
            )}
            
            {/* Info Section */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">What we extract:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
                <div>✓ Email addresses</div>
                <div>✓ Phone numbers</div>
                <div>✓ Full names</div>
                <div>✓ Job positions</div>
                <div>✓ Company info</div>
                <div>✓ LinkedIn profiles</div>
                <div>✓ Department data</div>
                <div>✓ Confidence scores</div>
              </div>
            </div>
            
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
                  Extracting Domain Data...
                </div>
              ) : (
                'Start Domain Extraction'
              )}
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              Form automated with <span className="text-teal-600 font-semibold">Brainmine.AI</span>
            </p>
            <div className="flex justify-center mt-4 space-x-4 text-xs text-gray-400">
              <span>✓ Enterprise Grade</span>
              <span>✓ Real-time Processing</span>
              <span>✓ Data Compliance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainForm;