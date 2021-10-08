import React from 'react';
import { graphql, StaticQuery } from 'gatsby';


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
              <p>{obj.fieldValue}</p>
            );
          })}
        </div>
      )}
    />
  );
}
export default AllTags;
