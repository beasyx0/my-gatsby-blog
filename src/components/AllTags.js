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
        <div>
          {data.allMdx.group.map((obj)=>{
            return(
              <Link key={obj.fieldValue} to={`/tags/${obj.fieldValue}/`}>
                <span>{obj.fieldValue}</span>
              </Link>
            );
          })}
        </div>
      )}
    />
  );
}
export default AllTags;
