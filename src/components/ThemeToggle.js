import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

import {FaSun, FaMoon} from 'react-icons/fa';


const ThemeToggle = () => {
  return(
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <div>
          <a 
            href="#" 
            onClick={()=> {(theme === 'dark' ? toggleTheme("light") : toggleTheme("dark"))}}
          >
            {theme === 'dark' ? <FaSun className={'text-warning h5'} /> : <FaMoon className={'text-warning h5'} />}
          </a>
        </div>
      )}
    </ThemeToggler>
  );
}

export default ThemeToggle;
