import React from 'react';

import { Link } from 'gatsby';

import ThemeToggle from './ThemeToggle';


const Header = ({ siteTitle, siteDescription }) => {
  return(
    <Link to="/">
      <header>
        <h1>{siteTitle}</h1>
        <p>{siteDescription}</p>
        <ThemeToggle />
      </header>
    </Link>
  );
}
export default Header;
