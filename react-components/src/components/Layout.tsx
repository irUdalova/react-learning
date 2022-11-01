import { NavLink, Outlet } from 'react-router-dom';
import React from 'react';
import './Layout.css';

export const Layout = () => {
  return (
    <>
      <header className="header">
        <NavLink
          className={({ isActive }) => {
            return `nav-link ${isActive ? 'nav-link_active' : ''}`;
          }}
          end
          to="/"
        >
          Films
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? 'nav-link_active' : ''}`}
          to="/about"
        >
          About us
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? 'nav-link_active' : ''}`}
          to="/player"
        >
          Become a member
        </NavLink>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
