import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

import {FaSun, FaMoon} from 'react-icons/fa';


const ThemeToggle = () => {

  const handleClick = (e, theme, toggleTheme) => {
    e.preventDefault();
    if (theme === 'light') {
      toggleTheme('dark')
    } else {
      toggleTheme('light')
    }
  }

  return(
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <>
          {theme === 'dark' && (
            <a href="#" onClick={(e)=>handleClick(e, theme, toggleTheme)}>
              <FaSun className={'text-warning h5'} />
            </a>
          )}
          {theme === 'light' && (
            <a href="#" onClick={(e)=>handleClick(e, theme, toggleTheme)}>
              <FaMoon className={'text-warning h5'} />
            </a>
          )}
        </>
      )}
    </ThemeToggler>
  );
}

export default ThemeToggle;
