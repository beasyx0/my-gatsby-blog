import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import _ from 'lodash';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import { useAppState } from '../Context';


const AllTags = () => {
  const state = useAppState();
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
            <Card.Title>
              <h3 className={'h5'}>Tags ({data.allMdx.group.length})</h3>
            </Card.Title>
            {data.allMdx.group.map((obj)=>{
              return(
                <Link key={obj.fieldValue} to={`/tags/${_.kebabCase(obj.fieldValue)}/`} className={'m-2'} style={{ lineHeight: '40px' }}>
                  <Badge 
                    bg={state.themeChoice} 
                    className={'scale-on-hover shadow border border-primary rounded text-primary'}
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
