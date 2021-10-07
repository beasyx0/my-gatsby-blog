import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from "react-seo-component";
import { useSiteMetadata } from "../hooks/use-site-metadata";


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

// all posts
const IndexPage = ({data}) => {
  const {
    title,
    description,
    siteUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
  } = useSiteMetadata();

  return(
    <>
    <SEO
      title={`Home`}
      titleTemplate={title}
      description={description}
      pathname={siteUrl}
      siteLanguage={siteLanguage}
      siteLocale={siteLocale}
      twitterUsername={twitterUsername}
    />
    {data.allMdx.nodes.map(({ id, excerpt, frontmatter, slug }) => (
      <article key={id} className={'mb-4 p-2 card shadow rounded'}>
        <Link to={`/${slug}`}>
          <p>{frontmatter.date}</p>
          <h1>{frontmatter.title}</h1>
          <p>{excerpt}</p>
        </Link>
      </article>
    ))}
    </>
  );
}
export default IndexPage;
