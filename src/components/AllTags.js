import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';

import { useAppState } from '../Context';
import Badge from 'react-bootstrap/Badge';


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
        <div>
          <h5>Tags:</h5>
          {data.allMdx.group.map((obj)=>{
            return(
              <Link key={obj.fieldValue} to={`/tags/${obj.fieldValue}/`} className={'mx-2 my-4'}>
                <Badge 
                  bg={state.themeChoice} 
                  className={'scale-on-hover shadow border border-primary rounded text-primary'}
                >
                 {obj.fieldValue} {obj.totalCount}
                </Badge>
              </Link>
            );
          })}
        </div>
      )}
    />
  );
}
export default AllTags;
