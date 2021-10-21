import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import _ from 'lodash';
import useDarkMode from 'use-dark-mode';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import { FaTags } from 'react-icons/fa';


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
            <h5>
              <FaTags className={'text-light'} />
              {' '}
              Tags ({data.allMdx.group.length})
            </h5>
            {data.allMdx.group.map((obj)=>{
              return(
                <Link 
                  key={obj.fieldValue} 
                  to={`/tags/${_.kebabCase(obj.fieldValue)}/`} 
                  className={'m-2'} style={{ lineHeight: '40px' }}
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
                   {obj.fieldValue} {obj.totalCount}
                  </Badge>
                </Link>
              );
            })}
          </Card.Body>
        </Card>
      )}
    />
  );
}
export default AllTags;
