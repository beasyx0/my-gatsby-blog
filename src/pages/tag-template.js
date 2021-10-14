import React from 'react';
import { graphql } from 'gatsby';

import Seo from "react-seo-component";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import AnimatePage from '../components/AnimatePage';
import PostList from '../components/PostList';


export const query = graphql`
  query ($tag: String) {
    allPostsForTag: allMdx(filter: {frontmatter: {tags: {in: [$tag]}}}) {
      totalCount
      edges {
        node {
          slug
          frontmatter {
            title
            date(formatString: "MMMM Do, YYYY @ h:mm a")
            tags
            image
          }
          excerpt(pruneLength: 200)
          id
          timeToRead
        }
      }
    }
    allTags: allMdx {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
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
  const { totalCount } = data.allPostsForTag;
  const nodes = data.allPostsForTag.edges;
  const posts = [];
  // PostList takes an array of posts
  nodes.forEach((node)=>{
    posts.push(node.node);
  })
  const tags = data.allTags.group; // tags with counts

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
        <PostList postsData={posts} tagsData={tags} />
      </AnimatePage>
    </>
  );
}
export default TagPage;
