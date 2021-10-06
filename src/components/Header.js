import React from 'react';

import { Link } from 'gatsby';


const Header = ({ siteTitle, siteDescription }) => {
  return(
    <Link to="/">
      <header>
        <h1>{siteTitle}</h1>
        <p>{siteDescription}</p>
      </header>
    </Link>
  );
}
export default Header;
