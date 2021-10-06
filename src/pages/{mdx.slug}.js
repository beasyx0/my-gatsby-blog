import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';


export const query = graphql`
  query POST_BY_SLUG($slug: String) {
    mdx(slug: { eq: $slug }) {
      id
      slug
      body
      frontmatter {
        title
        date(formatString: "YYYY MMMM Do")
      }
    }
  }
`;

// single post
const PostPage = ({ data }) => {
  const { body, frontmatter: { title }, frontmatter: { date } } = data.mdx;

  return(
    <article>
      <p>{date}</p>
      <h1>{title}</h1>
      <MDXRenderer>{body}</MDXRenderer>
    </article>
  );
}

export default PostPage;
