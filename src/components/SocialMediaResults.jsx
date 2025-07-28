import React from 'react';

// Icons
const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12,19 5,12 12,5"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7,10 12,15 17,10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22,4 12,14.01 9,11.01"/>
  </svg>
);

const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 4v6h6"/>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15,3 21,3 21,9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const SocialMediaResults = ({ 
  resultData, 
  formData, 
  submissionTime, 
  onBack, 
  onNewSearch 
}) => {
  
  // Download results as CSV
  const downloadAsCSV = () => {
    if (!resultData || !Array.isArray(resultData)) return;
    
    const headers = ['Name', 'Handle', 'Platform', 'Profile URL', 'Description'];
    const csvContent = [
      headers.join(','),
      ...resultData.map(row => [
        `"${(row.Name || '').replace(/"/g, '""')}"`,
        `"${(row.Handle || '').replace(/"/g, '""')}"`,
        `"${(row.Platform || '').replace(/"/g, '""')}"`,
        `"${(row.ProfileURL || '').replace(/"/g, '""')}"`,
        `"${(row.Description || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `social_leads_${formData.profession}_${formData.location}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download results as JSON
  const downloadAsJSON = () => {
    if (!resultData) return;
    
    const jsonData = {
      searchParameters: formData,
      submissionTime: submissionTime,
      extractionDate: new Date().toISOString(),
      totalResults: Array.isArray(resultData) ? resultData.length : 0,
      results: resultData
    };
    
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `social_leads_${formData.profession}_${formData.location}_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDomainForDisplay = (platform) => {
    const domainMap = {
      'linkedin': 'linkedin.com',
      'twitter': 'twitter.com',
      'facebook': 'facebook.com',
      'instagram': 'instagram.com'
    };
    return domainMap[platform] || platform;
  };

  const getResultsCount = () => {
    return Array.isArray(resultData) ? resultData.length : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 animate-slideIn">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div className="flex items-center mb-4 lg:mb-0">
              <button
                onClick={onBack}
                className="mr-4 p-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
              >
                <ArrowLeftIcon />
              </button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Social Media Lead Results</h1>
                <p className="text-gray-600 mt-1">
                  Found <span className="font-bold text-teal-600">{getResultsCount()} leads</span> for{' '}
                  <span className="font-medium text-teal-600">{formData.profession}</span> in{' '}
                  <span className="font-medium text-teal-600">{formData.location}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-2">
                  <CheckIcon />
                </div>
                <p className="text-sm text-gray-600">Completed in {submissionTime}s</p>
              </div>
            </div>
          </div>
          
          {/* Search Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Search Parameters:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Profession:</span>
                <p className="font-medium text-gray-800">{formData.profession}</p>
              </div>
              <div>
                <span className="text-gray-500">Location:</span>
                <p className="font-medium text-gray-800">{formData.location}</p>
              </div>
              <div>
                <span className="text-gray-500">Platform:</span>
                <p className="font-medium text-gray-800 capitalize">{formData.domain}</p>
              </div>
              <div>
                <span className="text-gray-500">Requested:</span>
                <p className="font-medium text-gray-800">{formData.results} results</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={downloadAsCSV}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <DownloadIcon />
              <span className="ml-2">Download CSV</span>
            </button>
            
            <button
              onClick={downloadAsJSON}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <DownloadIcon />
              <span className="ml-2">Download JSON</span>
            </button>
            
            <button
              onClick={onNewSearch}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RefreshIcon />
              <span className="ml-2">New Search</span>
            </button>
            
            <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-600">
                Source: <span className="font-medium text-teal-600">{formatDomainForDisplay(formData.domain)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Lead Details ({getResultsCount()} results)
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Handle
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profile
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(resultData) && resultData.map((lead, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium max-w-xs">
                        {lead.Name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {lead.Handle ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          @{lead.Handle}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">No handle</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {lead.Platform || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {lead.ProfileURL ? (
                        <a
                          href={lead.ProfileURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <span>View</span>
                          <ExternalLinkIcon />
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">No URL</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-md">
                        {lead.Description ? (
                          <div className="group relative">
                            <div className="truncate">
                              {lead.Description.length > 150 ? 
                                `${lead.Description.substring(0, 150)}...` : 
                                lead.Description
                              }
                            </div>
                            {lead.Description.length > 150 && (
                              <div className="invisible group-hover:visible absolute z-10 w-80 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg -top-2 left-0 transform -translate-y-full">
                                {lead.Description}
                                <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">No description</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Results powered by <span className="text-teal-600 font-semibold">Brainmine.AI</span> • 
            Extracted on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaResults;