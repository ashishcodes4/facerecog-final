import React from 'react';
import logo from '../logo.svg';

class TopBar extends React.Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Face recogniton hub.....</h1>
        </header>
      </div>
    );
  }
}

export default TopBar;
