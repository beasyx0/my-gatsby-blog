import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';


const ThemeToggle = () => {
  return(
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <div>
          <a 
            href="#" 
            className={'btn btn-outline-primary'}
            onClick={() => (theme === 'dark' ? toggleTheme("light") : toggleTheme("dark"))}
          >
            toggle
          </a>
        </div>
      )}
    </ThemeToggler>
  );
}

export default ThemeToggle;
