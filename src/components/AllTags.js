import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import useDarkMode from 'use-dark-mode';

import Card from 'react-bootstrap/Card';

import { FaTags } from 'react-icons/fa';
import Tag from './Tag';


const AllTags = () => {

  const darkMode = useDarkMode();

  return(
    <StaticQuery
      query={graphql`
        query {
          allMdx {
            group(field: frontmatter___tags) {
              fieldValue
              totalCount
            }
          }
        }
      `}
      render={data => (
        <Card className={'mb-4 p-2 bg-transparent shadow'}>
          <Card.Body>
            <h5 className={'mb-4'}>
              <FaTags className={darkMode.value ? 'text-light' : 'text-dark'} />
              {' '}
              Tags ({data.allMdx.group.length})
            </h5>
            <ul className={'m-0 list-unstyled'}>
              {data.allMdx.group.map((obj)=>{
                return(
                  <li className={'m-2 d-inline-block'}>
                    <Tag tag={obj} />
                  </li>
                );
              })}
            </ul>
          </Card.Body>
        </Card>
      )}
    />
  );
}
export default AllTags;
