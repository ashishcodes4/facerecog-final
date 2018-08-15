import React from 'react';

const Navigation = ({ onRouteChange }) => {
  return (
    <nav className="nav-bar">
      <p className='cursor' onClick={() => onRouteChange('signin')}>Signout</p>
    </nav>
  );
};

export default Navigation;
