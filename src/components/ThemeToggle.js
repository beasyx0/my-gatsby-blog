import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

import {FaSun, FaMoon} from 'react-icons/fa';

import { useAppState, useAppDispatch } from '../Context';


const ThemeToggle = () => {

  const dispatch = useAppDispatch();

  const handleClick = (e, theme, toggleTheme) => {
    e.preventDefault();
    if (theme === 'light') {
      toggleTheme('dark');
      dispatch({ type: 'SWITCH_THEME', themeChoice: 'dark' });
    } else {
      toggleTheme('light');
      dispatch({ type: 'SWITCH_THEME', themeChoice: 'light' });
    }
  }

  return(
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <>
          {theme === 'dark' && (
            <a href="/" onClick={(e)=>handleClick(e, theme, toggleTheme)}>
              <FaSun className={'text-warning h5 scale-on-hover'} />
            </a>
          )}
          {theme === 'light' && (
            <a href="/" onClick={(e)=>handleClick(e, theme, toggleTheme)}>
              <FaMoon className={'text-warning h5 scale-on-hover'} />
            </a>
          )}
        </>
      )}
    </ThemeToggler>
  );
}

export default ThemeToggle;
