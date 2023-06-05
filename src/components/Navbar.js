import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Inicio</Link>
        </li>
        <li className="navbar-item">
          <Link to="/fiscalias" className="navbar-link">Fiscalias</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin" className="navbar-link">Administración</Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">Acerca</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;