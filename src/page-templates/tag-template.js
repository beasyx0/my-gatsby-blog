import React from 'react';
import { graphql } from 'gatsby';
import Seo from "react-seo-component";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import AnimatePage from '../components/AnimatePage';
import PostList from '../components/PostList';
import PaginationNav from '../components/PaginationNav';


export const query = graphql`
  query ($tag: String, $skip: Int!, $limit: Int!) {
    allPostsForTag: allMdx(
      filter: {frontmatter: {tags: {in: [$tag]}}}
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM Do, YYYY @ h:mm a")
            tags
            cover {
              publicURL
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          slug
          excerpt(pruneLength: 150)
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

  const { tag, tagNumPages, currentPage } = pageContext;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === tagNumPages;
  const prevPage = (
    currentPage - 1 === 1 ? (
        `/tags/${tag}/`
      ) : (
        `/tags/${tag}/` + (currentPage - 1).toString() + '/'
      )
  );
  const nextPage = `/tags/${tag}/` + (currentPage + 1).toString() + '/';
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
        <h1 className={'h5'}>{tagHeader}</h1>
        <PostList postsData={posts} tagsData={tags} />
        <PaginationNav 
          currentPage={currentPage} 
          numPages={tagNumPages} 
          isFirstPage={isFirstPage} 
          isLastPage={isLastPage} 
          prevPage={prevPage} 
          nextPage={nextPage}
        />
      </AnimatePage>
    </>
  );
}
export default TagPage;
