import React from 'react';
import './Loader.css';

export class Loader extends React.Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
}
