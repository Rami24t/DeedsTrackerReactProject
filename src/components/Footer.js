import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <p>&copy;{new Date().getFullYear()} Rami Al-Saadi</p>
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;
