import React from 'react';
import { graphql, Link } from 'gatsby';

import SEO from "react-seo-component";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import MotionDiv from '../components/MotionDiv';


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

  const {
    title,
    siteUrl,
    siteImageUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
  } = useSiteMetadata();

  const pageDescription = `A list of blog posts tagged with ${tag}`

  return(
    <>
      <SEO
        title={`Tag Detail`}
        titleTemplate={title}
        titleSeperator={'-'}
        description={pageDescription}
        pathname={`${siteUrl}/tags/${tag}`}
        image={siteImageUrl}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
      />
      <MotionDiv>
        <h1>{tagHeader}</h1>
        {edges.map(({ node }) => {
          const { slug, excerpt } = node;
          const { title, date, tags } = node.frontmatter;

          return (
            <div className={'mb-4 p-2 card shadow rounded text-dark'} key={slug}>
              <Link to={`/${slug}`}>
                <h3>{title}</h3>
              </Link>

              <p>{date}</p>
                <span> ● Tag: </span>
                {tags && (
                  <>
                    {tags.map((tag) => (
                      <Link key={tag} to={`/tags/${tag}/`}>
                        {tag}
                      </Link>
                    ))}
                  </>
                )}
              <p>{excerpt}</p>
            </div>
          );
        })}
      </MotionDiv>
    </>
  );
}
export default TagPage;