import React from 'react';

const Navigation = ({ onRouteChange, isSingnedIn }) => {

   if(isSingnedIn) {
     return (
      <nav className="nav-bar">
      <p className='pointer' onClick={() => onRouteChange('signout')}>Signout</p>
      </nav>
     );
   } else { 
     return(
     <nav className="nav-bar">
      <p className='pointer mr2' onClick={() => onRouteChange('signin')}>Signin</p>
      <p className='pointer mr2' onClick={() => onRouteChange('register')}>Register</p>
      </nav>
     );
   }
};

export default Navigation;
