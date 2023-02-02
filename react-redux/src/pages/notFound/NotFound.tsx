import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <div className="not-found">
        Page not found, go&nbsp;
        <NavLink className="films-link" to="/films">
          Films
        </NavLink>
      </div>
    </>
  );
}
