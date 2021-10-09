import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';


const AllTags = () => {
  return(
    <StaticQuery
      query={graphql`
        query {
          allMdx {
            group(field: frontmatter___tags) {
              fieldValue
            }
          }
        }
      `}
      render={data => (
        <p>
          {data.allMdx.group.map((obj)=>{
            return(
              <Link key={obj.fieldValue} to={`/tags/${obj.fieldValue}/`}>
                <span>{obj.fieldValue}</span>
              </Link>
            );
          })}
        </p>
      )}
    />
  );
}
export default AllTags;
