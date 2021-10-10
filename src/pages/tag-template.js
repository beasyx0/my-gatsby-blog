import React from 'react';
import { graphql } from 'gatsby';

import Seo from "react-seo-component";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import AnimatePage from '../components/AnimatePage';
import PostCard from '../components/PostCard';


export const query = graphql`
  query ($tag: String) {
    allMdx(filter: {frontmatter: {tags: {in: [$tag]}}}) {
      totalCount
      edges {
        node {
          slug
          frontmatter {
            title
            date(formatString: "YYYY MMMM Do")
            tags
            image
          }
          excerpt(pruneLength: 200)
          id
          timeToRead
        }
      }
    }
  }
`

const TagPage = ({ pageContext, data }) => {

  const {
    title,
    siteUrl,
    siteImageUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
  } = useSiteMetadata();

  const { tag } = pageContext;
  const { totalCount } = data.allMdx;
  const posts = data.allMdx.edges;
  const tagHeader = `
    ${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"
  `;

  const pageDescription = `A list of blog posts tagged with ${tag}`

  return(
    <>
      <Seo
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
      <AnimatePage>
        <h2>{tagHeader}</h2>
        {posts.map(({node}) => {
          const { date, image, title, tags } = node.frontmatter;
          const { slug, excerpt, timeToRead } = node;
          return (
            <PostCard 
              slug={slug} 
              date={date} 
              postImageUrl={image} 
              timeToRead={timeToRead}
              title={title} 
              excerpt={excerpt} 
              tags={tags}
            />
          );
        })}
      </AnimatePage>
    </>
  );
}
export default TagPage;
