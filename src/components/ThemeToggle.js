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
    <div className={'d-flex justify-content-end'}>
      <>
        {darkMode.value && (
          <a href="/" onClick={handleThemeChange}>
            <FaSun className={'mx-2 text-warning h5 scale-on-hover'} />
          </a>
        )}
        {!darkMode.value && (
          <a href="/" onClick={handleThemeChange}>
            <FaMoon className={'mx-2 text-warning h5 scale-on-hover'} />
          </a>
        )}
      </>
    </div>
  );
}

export default ThemeToggle;
