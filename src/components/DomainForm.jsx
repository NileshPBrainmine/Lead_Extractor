
// import React, { useState } from 'react';
// import DomainSearchResults from './DomainSearchResults.jsx';

// // Simple Arrow Left icon as SVG component
// const ArrowLeftIcon = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="19" y1="12" x2="5" y2="12"/>
//     <polyline points="12 19 5 12 12 5"/>
//   </svg>
// );

// const DomainForm = ({ onBack }) => {
//   const [formData, setFormData] = useState({
//     domain: '',
//     results: '',
//     apiKey: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
//   const [resultData, setResultData] = useState(null);
//   const [submissionTime, setSubmissionTime] = useState(null);

//   // Webhook URL
//   const WEBHOOK_URL = 'https://n8n.srv915056.hstgr.cloud/webhook-test/domainsearch';

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
    
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: '' });
//     }
    
//     if (submitStatus) {
//       setSubmitStatus(null);
//       setResultData(null);
//     }
//   };

//   const validateDomain = (domain) => {
//     const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
//     const urlPattern = /^https?:\/\//;
//     const cleanDomain = domain.replace(urlPattern, '').replace(/\/.*$/, '');
//     return domainPattern.test(cleanDomain) || domain.includes('.');
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.domain.trim()) newErrors.domain = 'Please enter a domain name';
//     else if (!validateDomain(formData.domain)) newErrors.domain = 'Please enter a valid domain (e.g., example.com)';
//     if (!formData.results) newErrors.results = 'Please select number of results';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const formatDomainForWebhook = (domain) => {
//     return domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase();
//   };

//   const handleNewSearch = () => {
//     setFormData({ domain: '', results: '', apiKey: '' });
//     setSubmitStatus(null);
//     setResultData(null);
//     setSubmissionTime(null);
//     setErrors({});
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
//     setSubmitStatus(null);
//     setResultData(null);
//     const startTime = new Date();
    
//     try {
//       const webhookData = {
//         domain: formatDomainForWebhook(formData.domain),
//         results: parseInt(formData.results),
//         apiKey: formData.apiKey.trim() || null,
//         originalDomain: formData.domain.trim(),
//         timestamp: new Date().toISOString(),
//         formType: 'domain_search'
//       };

//       const response = await fetch(WEBHOOK_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(webhookData)
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         if (responseData && (Array.isArray(responseData) || typeof responseData === 'object')) {
//           const endTime = new Date();
//           const duration = Math.round((endTime - startTime) / 1000);
//           setSubmissionTime(duration);
//           setResultData(responseData);
//           setSubmitStatus('success');
//         } else {
//           throw new Error('Invalid response data format');
//         }
//       } else {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error sending data to webhook:', error);
//       setSubmitStatus('error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (submitStatus === 'success' && resultData && Array.isArray(resultData)) {
//     return (
//       <DomainSearchResults
//         resultData={resultData}
//         formData={formData}
//         submissionTime={submissionTime}
//         onBack={onBack}
//         onNewSearch={handleNewSearch}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 animate-slideIn">
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 sm:p-10">
//         <div className="flex items-center mb-8">
//           <button
//             onClick={onBack}
//             className="mr-4 p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//             disabled={isSubmitting}
//           >
//             <ArrowLeftIcon />
//           </button>
//           <div className="flex-1">
//             <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-500 text-transparent bg-clip-text">Domain Lead Extractor</h1>
//             <p className="text-gray-500 mt-1 text-sm sm:text-base">Extract leads using a company domain</p>
//           </div>
//         </div>
        
//         {submitStatus === 'error' && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-sm font-medium text-red-800">
//               Failed to submit request. Please check your connection and try again.
//             </p>
//           </div>
//         )}
        
//         <div className="space-y-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">Domain Name *</label>
//             <input
//               type="text"
//               name="domain"
//               value={formData.domain}
//               onChange={handleInputChange}
//               placeholder="e.g., brainmine.ai, example.com"
//               className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${errors.domain ? 'border-red-500' : 'border-gray-300'}`}
//               disabled={isSubmitting}
//             />
//             {errors.domain && <p className="text-red-500 text-sm">{errors.domain}</p>}
//           </div>
          
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">Number of Results *</label>
//             <select 
//               name="results"
//               value={formData.results}
//               onChange={handleInputChange}
//               className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${errors.results ? 'border-red-500' : 'border-gray-300'}`}
//               disabled={isSubmitting}
//             >
//               <option value="">Select number of results</option>
//               <option value="10">10 Results</option>
//             </select>
//             {errors.results && <p className="text-red-500 text-sm">{errors.results}</p>}
//           </div>
          
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">
//               API KEY <span className="text-xs text-gray-500 ml-1">(Optional)</span>
//             </label>
//             <input
//               type="password"
//               name="apiKey"
//               value={formData.apiKey}
//               onChange={handleInputChange}
//               placeholder="Enter your API Key for enhanced results"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
//               disabled={isSubmitting}
//             />
//           </div>
          
//           <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
//             <h4 className="font-medium text-blue-800 mb-2">What we extract:</h4>
//             <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-blue-700">
//               <span>✓ Email addresses</span>
//               <span>✓ Phone numbers</span>
//               <span>✓ Full names</span>
//               <span>✓ Job positions</span>
//               <span>✓ Company info</span>
//               <span>✓ LinkedIn profiles</span>
//               <span>✓ Department data</span>
//               <span>✓ Confidence scores</span>
//             </div>
//           </div>
          
//           <button
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className={`w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold py-3 rounded-lg hover:from-green-500 hover:to-teal-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
//           >
//             {isSubmitting ? (
//               <div className="flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
//                 Extracting...
//               </div>
//             ) : (
//               'Start Domain Extraction'
//             )}
//           </button>
//         </div>
        
//         <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col items-center">
//           <p className="text-sm text-gray-500">
//             Form automated with <span className="text-teal-600 font-semibold">Brainmine.AI</span>
//           </p>
//           <div className="flex mt-3 space-x-4 text-xs text-gray-400">
//             <span>✓ Enterprise Grade</span>
//             <span>✓ Real-time Processing</span>
//             <span>✓ Data Compliance</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DomainForm;



//------------------------------------------------------------------------------------------
import React, { useState } from 'react';
import DomainSearchResults from './DomainSearchResults.jsx';

// Simple Arrow Left icon as SVG component
const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
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

  // Webhook URL - Use the direct webhook URL (this works!)
  const WEBHOOK_URL = 'https://n8n.srv915056.hstgr.cloud/webhook/domainsearch';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    if (submitStatus) {
      setSubmitStatus(null);
      setResultData(null);
    }
  };

  const validateDomain = (domain) => {
    const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    const urlPattern = /^https?:\/\//;
    const cleanDomain = domain.replace(urlPattern, '').replace(/\/.*$/, '');
    return domainPattern.test(cleanDomain) || domain.includes('.');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.domain.trim()) newErrors.domain = 'Please enter a domain name';
    else if (!validateDomain(formData.domain)) newErrors.domain = 'Please enter a valid domain (e.g., example.com)';
    if (!formData.results) newErrors.results = 'Please select number of results';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDomainForWebhook = (domain) => {
    return domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase();
  };

  const handleNewSearch = () => {
    setFormData({ domain: '', results: '', apiKey: '' });
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
        domain: formatDomainForWebhook(formData.domain),
        results: parseInt(formData.results),
        apiKey: formData.apiKey.trim() || null,
        originalDomain: formData.domain.trim(),
        timestamp: new Date().toISOString(),
        formType: 'domain_search'
      };

      // Log the data being sent to webhook
      console.log('📤 DOMAIN FORM - DATA BEING SENT TO WEBHOOK:', webhookData);
      console.log('🔗 DOMAIN FORM - Webhook URL:', WEBHOOK_URL);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(webhookData)
      });

      console.log('📡 DOMAIN FORM - Response Status:', response.status);
      console.log('📡 DOMAIN FORM - Response OK:', response.ok);

      if (response.ok) {
        const responseData = await response.json();
        
        // Log the response data received
        console.log('📥 DOMAIN FORM - RESPONSE DATA RECEIVED FROM WEBHOOK:', responseData);
        console.log('📊 DOMAIN FORM - Data type:', typeof responseData);
        console.log('📋 DOMAIN FORM - Is Array:', Array.isArray(responseData));
        
        if (Array.isArray(responseData)) {
          console.log('📈 DOMAIN FORM - Number of results:', responseData.length);
          console.log('🔍 DOMAIN FORM - Sample result (first item):', responseData[0]);
          
          // Log all unique keys found in the response data
          const allKeys = new Set();
          responseData.forEach(item => {
            if (typeof item === 'object' && item !== null) {
              Object.keys(item).forEach(key => allKeys.add(key));
            }
          });
          console.log('🗝️ DOMAIN FORM - All unique keys in response data:', Array.from(allKeys));
        } else if (typeof responseData === 'object' && responseData !== null) {
          console.log('📋 DOMAIN FORM - Response is object, keys:', Object.keys(responseData));
          console.log('🔍 DOMAIN FORM - Response object structure:', responseData);
        }
        
        if (responseData && (Array.isArray(responseData) || typeof responseData === 'object')) {
          const endTime = new Date();
          const duration = Math.round((endTime - startTime) / 1000);
          console.log('⏱️ DOMAIN FORM - Request completed in:', duration, 'seconds');
          
          setSubmissionTime(duration);
          setResultData(responseData);
          setSubmitStatus('success');
        } else {
          console.error('❌ DOMAIN FORM - Invalid response data format:', responseData);
          throw new Error('Invalid response data format');
        }
      } else {
        const errorText = await response.text();
        console.error('❌ DOMAIN FORM - Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('💥 DOMAIN FORM - Error sending data to webhook:', error);
      console.error('💥 DOMAIN FORM - Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // Check if it's a CORS error
      if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
        console.error('🚫 DOMAIN FORM - This looks like a CORS error. The server needs to be configured to allow cross-origin requests.');
        setErrors({ general: 'CORS Error: The server needs to allow cross-origin requests. Please check the server configuration.' });
      }
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success' && resultData) {
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 animate-slideIn">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            disabled={isSubmitting}
          >
            <ArrowLeftIcon />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-500 text-transparent bg-clip-text">Domain Lead Extractor</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Extract leads using a company domain</p>
          </div>
        </div>
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-800">
              {errors.general || "Failed to submit request. Please check your connection and try again."}
            </p>
            {errors.general && errors.general.includes('CORS') && (
              <div className="mt-2 text-xs text-red-600">
                <p><strong>Solutions:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Configure CORS headers on your N8N webhook server</li>
                  <li>Add a development proxy in vite.config.js</li>
                  <li>Deploy your frontend to the same domain as your webhook</li>
                </ul>
              </div>
            )}
          </div>
        )}
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Domain Name *</label>
            <input
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
              placeholder="e.g., brainmine.ai, example.com"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${errors.domain ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
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
            </select>
            {errors.results && <p className="text-red-500 text-sm">{errors.results}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              API KEY <span className="text-xs text-gray-500 ml-1">(Optional)</span>
            </label>
            <input
              type="password"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleInputChange}
              placeholder="Enter your API Key for enhanced results"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">What we extract:</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-blue-700">
              <span>✓ Email addresses</span>
              <span>✓ Phone numbers</span>
              <span>✓ Full names</span>
              <span>✓ Job positions</span>
              <span>✓ Company info</span>
              <span>✓ LinkedIn profiles</span>
              <span>✓ Department data</span>
              <span>✓ Confidence scores</span>
            </div>
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
              'Start Domain Extraction'
            )}
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col items-center">
          <p className="text-sm text-gray-500">
            Form automated with <span className="text-teal-600 font-semibold">Brainmine.AI</span>
          </p>
          <div className="flex mt-3 space-x-4 text-xs text-gray-400">
            <span>✓ Enterprise Grade</span>
            <span>✓ Real-time Processing</span>
            <span>✓ Data Compliance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainForm;