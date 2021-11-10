import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import useDarkMode from 'use-dark-mode';
import Badge from 'react-bootstrap/Badge';


const Tag = ({ tag }) => {

  const darkMode = useDarkMode();

  return(
    <Link 
      key={tag.fieldValue} 
      to={`/tags/${_.kebabCase(tag.fieldValue)}/`} 
    >
      <Badge 
        bg={`${darkMode.value ? 'dark' : 'light'}`} 
        className={`(
          shadow-sm border ${(
            darkMode.value && 'border-secondary'
          )} rounded text-primary scale-on-hover
        )`}
        style={{
          transition: darkMode.value === 'light' ? 'background-color 0.5s ease' : ''
        }}
      >
       {tag.fieldValue} {tag.totalCount}
      </Badge>
    </Link>  
  );
}
export default Tag;
