import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import Card from 'react-bootstrap/Card';
import { FaList, FaDotCircle } from 'react-icons/fa';


const Toc = () => {

  const [headings, setHeadings] = useState([]);

  useEffect(()=>{
    // adds id's to all the h1 and h2 headers for table of contents. 
    if (typeof window !== undefined) {
      const article = document.getElementById('blog-post');
      const postHeadings = Array.from(
        article.querySelectorAll('h1, h2')
      );
      postHeadings.forEach((heading)=>{
        heading.setAttribute('id', _.kebabCase(heading.innerText))
        setHeadings(headings => [...headings, heading])
      })
    }
    // eslint-disable-next-line
  }, [])

  const faDotCircleStyles = {
    fontSize: '14px',
  }

  return(
    <>
      {headings.length > 0 && (
        <Card className={'my-4 p-1 bg-transparent shadow'}>
          <h5 className={'my-3 text-center'}>
            <FaList className={'mt-1 h6'} />
            {' '}
            Table of Contents
          </h5>
          <Card.Body className={'d-flex justify-content-center'}>
            <ul className={'list-unstyled'}>
              {headings.map((heading) => (
                <li 
                  key={_.kebabCase(heading.innerText)} 
                  className={`${heading.nodeName === 'H2' && 'px-5'}`}
                >
                  {heading.nodeName === 'H1' && (
                    <FaDotCircle 
                      className={'mx-2 text-secondary'} 
                      style={faDotCircleStyles} 
                    />
                  )}
                  <a href={`#${_.kebabCase(heading.innerText)}`}>
                    {heading.innerText}
                  </a>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default Toc;
