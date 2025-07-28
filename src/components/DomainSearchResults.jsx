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

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21h18"/>
    <path d="M5 21V7l8-4v18"/>
    <path d="M19 21V11l-6-4"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const DomainSearchResults = ({ 
  resultData, 
  formData, 
  submissionTime, 
  onBack, 
  onNewSearch 
}) => {
  
  // Download results as CSV
  const downloadAsCSV = () => {
    if (!resultData || !Array.isArray(resultData)) return;
    
    const headers = [
      'Full Name', 'First Name', 'Last Name', 'Email', 'Phone Number', 
      'Company', 'Position', 'Department', 'Seniority', 'LinkedIn Profile',
      'Confidence', 'Verification Status', 'Source'
    ];
    
    const csvContent = [
      headers.join(','),
      ...resultData.map(row => [
        `"${(row.fullName || '').replace(/"/g, '""')}"`,
        `"${(row.firstName || '').replace(/"/g, '""')}"`,
        `"${(row.lastName || '').replace(/"/g, '""')}"`,
        `"${(row.email || '').replace(/"/g, '""')}"`,
        `"${(row.phoneNumber || '').replace(/"/g, '""')}"`,
        `"${(row.company || '').replace(/"/g, '""')}"`,
        `"${(row.position || '').replace(/"/g, '""')}"`,
        `"${(row.department || '').replace(/"/g, '""')}"`,
        `"${(row.seniority || '').replace(/"/g, '""')}"`,
        `"${(row.linkedinProfile || '').replace(/"/g, '""')}"`,
        `"${(row.confidence || '').toString().replace(/"/g, '""')}"`,
        `"${(row.verificationStatus || '').replace(/"/g, '""')}"`,
        `"${(row.source || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `domain_leads_${formData.domain}_${new Date().toISOString().split('T')[0]}.csv`);
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
    link.setAttribute('download', `domain_leads_${formData.domain}_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getResultsCount = () => {
    return Array.isArray(resultData) ? resultData.length : 0;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'bg-green-100 text-green-800';
    if (confidence >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getVerificationStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'invalid': return 'bg-red-100 text-red-800';
      case 'unknown': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-600';
    }
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
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Domain Lead Results</h1>
                <p className="text-gray-600 mt-1">
                  Found <span className="font-bold text-teal-600">{getResultsCount()} leads</span> from{' '}
                  <span className="font-medium text-teal-600">{formData.domain}</span>
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
                <span className="text-gray-500">Domain:</span>
                <p className="font-medium text-gray-800">{formData.domain}</p>
              </div>
              <div>
                <span className="text-gray-500">Results Requested:</span>
                <p className="font-medium text-gray-800">{formData.results}</p>
              </div>
              <div>
                <span className="text-gray-500">API Key:</span>
                <p className="font-medium text-gray-800">{formData.apiKey ? 'Premium Mode' : 'Standard Mode'}</p>
              </div>
              <div>
                <span className="text-gray-500">Source:</span>
                <p className="font-medium text-gray-800">Hunter.io</p>
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
                Domain: <span className="font-medium text-teal-600">{formData.domain}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Employee Details ({getResultsCount()} results)
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
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LinkedIn
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
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
                      <div className="flex items-center">
                        <UserIcon />
                        <div className="ml-2">
                          <div className="font-medium">
                            {lead.fullName || `${lead.firstName || ''} ${lead.lastName || ''}`.trim() || 'N/A'}
                          </div>
                          {lead.department && (
                            <div className="text-xs text-gray-500">{lead.department}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {lead.email ? (
                        <div className="flex items-center">
                          <MailIcon />
                          <a 
                            href={`mailto:${lead.email}`}
                            className="ml-2 text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {lead.email}
                          </a>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">No email</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs">
                        {lead.position ? (
                          <div>
                            <div className="font-medium">{lead.position}</div>
                            {lead.seniority && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                {lead.seniority}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">No position</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {lead.company ? (
                        <div className="flex items-center">
                          <BuildingIcon />
                          <span className="ml-2 font-medium">{lead.company}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">No company</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {lead.phoneNumber ? (
                        <div className="flex items-center">
                          <PhoneIcon />
                          <a 
                            href={`tel:${lead.phoneNumber}`}
                            className="ml-2 text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {lead.phoneNumber}
                          </a>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">No phone</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {lead.linkedinProfile ? (
                        <a
                          href={lead.linkedinProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <LinkedinIcon />
                          <span className="ml-1">Profile</span>
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">No profile</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {lead.confidence ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConfidenceColor(lead.confidence)}`}>
                          {lead.confidence}%
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Unknown</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getVerificationStatusColor(lead.verificationStatus)}`}>
                        {lead.verificationStatus || 'Unknown'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-gray-900">{getResultsCount()}</div>
            <div className="text-sm text-gray-600">Total Leads</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-green-600">
              {Array.isArray(resultData) ? resultData.filter(lead => lead.email).length : 0}
            </div>
            <div className="text-sm text-gray-600">With Email</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-blue-600">
              {Array.isArray(resultData) ? resultData.filter(lead => lead.phoneNumber).length : 0}
            </div>
            <div className="text-sm text-gray-600">With Phone</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-purple-600">
              {Array.isArray(resultData) ? resultData.filter(lead => lead.linkedinProfile).length : 0}
            </div>
            <div className="text-sm text-gray-600">With LinkedIn</div>
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

export default DomainSearchResults;
