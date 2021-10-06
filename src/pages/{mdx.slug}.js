import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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

const PostPage = ({ data }) => {
  const { body, frontmatter: { title }, frontmatter: { date } } = data.mdx;

  return(
    <Container>
      <Row>
        <Col>
          <p>{date}</p>
          <h1>{title}</h1>
          <MDXRenderer>{body}</MDXRenderer>
        </Col>
      </Row>
    </Container>
  );
}

export default PostPage;
