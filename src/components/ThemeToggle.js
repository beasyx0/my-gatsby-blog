import React from 'react';
// import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import useDarkMode from 'use-dark-mode';
import {FaSun, FaMoon} from 'react-icons/fa';


const ThemeToggle = () => {

  const darkMode = useDarkMode();

  const handleThemeChange = (e) => {
    e.preventDefault();
    darkMode.toggle();
  }

  return(
    <div>
      <>
        {darkMode.value && (
          <a href="/" onClick={handleThemeChange}>
            <FaSun className={'text-warning h5 scale-on-hover'} />
          </a>
        )}
        {!darkMode.value && (
          <a href="/" onClick={handleThemeChange}>
            <FaMoon className={'text-warning h5 scale-on-hover'} />
          </a>
        )}
      </>
    </div>
  );
}

export default ThemeToggle;
