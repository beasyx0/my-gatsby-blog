import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';


export const query = graphql`
  query SITE_INDEX_QUERY {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY MMMM Do")
        }
        slug
      }
    }
  }
`;


const IndexPage = ({data}) => {
  return(
    <Layout>
      {data.allMdx.nodes.map(({ id, excerpt, frontmatter, slug }) => (
        <article key={id} className={'card shadow'}>
          <Link to={`/${slug}`}>
            <p>{frontmatter.date}</p>
            <h1>{frontmatter.title}</h1>
            <p>{excerpt}</p>
          </Link>
        </article>
      ))}
    </Layout>
  );
}
export default IndexPage;
