import React, { useState } from 'react';
import LoginPage from './components/LoginPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import SocialMediaForm from './components/SocialMediaForm.jsx';
import DomainForm from './components/DomainForm.jsx';
import './styles/animations.css';

const App = () => {
  const [currentView, setCurrentView] = useState('login');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <LoginPage onLogin={() => setCurrentView('dashboard')} />;
      case 'dashboard':
        return (
          <Dashboard
            onSelectSocial={() => setCurrentView('social')}
            onSelectDomain={() => setCurrentView('domain')}
          />
        );
      case 'social':
        return <SocialMediaForm onBack={() => setCurrentView('dashboard')} />;
      case 'domain':
        return <DomainForm onBack={() => setCurrentView('dashboard')} />;
      default:
        return <LoginPage onLogin={() => setCurrentView('dashboard')} />;
    }
  };

  return (
    <div className="font-sans">
      {renderCurrentView()}
    </div>
  );
};

export default App;