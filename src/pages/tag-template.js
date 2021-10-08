import React from 'react';
import { graphql, Link } from 'gatsby';

import MotionDiv from '../components/MotionDiv';

// todo: setup seo instance in this page
// todo: make all tags clickable

export const query = graphql`
  query ($tag: String) {
    allMdx(filter: {frontmatter: {tags: {in: [$tag]}}}) {
      totalCount
      edges {
        node {
          slug
          frontmatter {
            title
            date(formatString: "YYYY MMMM D0")
            tags
          }
          excerpt(pruneLength: 200)
          id
        }
      }
    }
  }
`

const TagPage = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return(
    <MotionDiv>
      <h1>{tagHeader}</h1>
      {edges.map(({ node }) => {
        const { slug, excerpt } = node;
        const { title, date, tags } = node.frontmatter;

        return (
          <div key={slug}>
            <Link to={`/${slug}`}>
              <h3>{title}</h3>
            </Link>

            <p>
              {date}
              <span> ● Tag: </span>
              {tags.map((tag) => (
                <Link
                  key={tag.toLowerCase()}
                  to={`/tags/${tag.toLowerCase()}`}
                >
                  {tag}
                </Link>
              ))}
            </p>
            <p>{excerpt}</p>
          </div>
        );
      })}
    </MotionDiv>
  );
}
export default TagPage;