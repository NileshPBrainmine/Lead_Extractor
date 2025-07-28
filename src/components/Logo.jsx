import React from 'react';

const Logo = ({ size = 'large', className = '' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16', 
    large: 'w-24 h-24'
  };

  const containerSizes = {
    small: 'w-16 h-16',
    medium: 'w-20 h-20',
    large: 'w-32 h-32'
  };

  return (
    <div className={`flex items-center justify-center ${size === 'large' ? 'mb-8' : 'mb-4'} ${className}`}>
      <img
        src="/01.png"
        alt="Brainmine AI Logo"
        className={`${sizeClasses[size]} object-contain`}
        onError={(e) => {
          // Fallback to a simple text logo if image fails to load
          e.target.style.display = 'none';
          e.target.nextElementSibling.style.display = 'flex';
        }}
      />
      {/* Fallback text logo */}
      <div 
        className={`${sizeClasses[size]} hidden items-center justify-center text-white font-bold text-xl`}
        style={{ display: 'none' }}
      >
        B.AI
      </div>
    </div>
  );
};

export default Logo;