import React from 'react';
import { graphql } from 'gatsby';
import Seo from "react-seo-component";
import { useSiteMetadata } from "../hooks/use-site-metadata";

import { FaBlog } from 'react-icons/fa';

// import usePosts from '../hooks/use-posts';
import AnimatePage from '../components/AnimatePage';
import PostList from '../components/PostList';
import PaginationNav from '../components/PaginationNav';

// change the post detail page creation for cover
export const query = graphql`
  query SITE_INDEX_QUERY($skip: Int!, $limit: Int!) {
    allPosts: allMdx(
      sort: {fields: [frontmatter___date], order: DESC}
      limit: $limit
      skip: $skip
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "MMMM Do, YYYY @ h:mm a")
          tags
          cover {
            publicURL
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
              )
            }
          }
        }
        excerpt(pruneLength: 150)
        slug
        timeToRead
      }
    }
    allTags: allMdx {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

// all posts
const BlogListTemplate = ({data, pageContext}) => {

  // const { posts: allPosts } = usePosts();

  // allPosts.map(post=>{
  //   console.log("===================================");
  //   console.log(post.slug)
  //   console.log("===================================");
  // })

  const {
    title,
    description,
    siteUrl,
    siteImageUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
    authorName,
  } = useSiteMetadata();

  const posts = data.allPosts.nodes;
  const tags = data.allTags.group; // tags with counts
  const { totalCount, currentPage, numPages } = pageContext;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numPages;
  const prevPage = (
    currentPage - 1 === 1 ? '/' : '/blog/' + (currentPage - 1).toString() + '/'
  );
  const nextPage = '/blog/' + (currentPage + 1).toString() + '/';

  const blogHeader = `All Posts (${totalCount})`;

  return(
    <>
      <Seo
        title={'Blog'}
        titleTemplate={title}
        titleSeperator={'-'}
        description={description}
        pathname={`${currentPage === 1 ? siteUrl : siteUrl + '/blog/' + currentPage}`}
        image={siteImageUrl}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
        author={authorName}
      />
      <AnimatePage>
        <h1 className={'h5'}>
          <FaBlog className={'text-light'} />
          {' '}
          { blogHeader }
        </h1>
        <PostList postsData={posts} tagsData={tags}  />
        <PaginationNav 
          currentPage={currentPage} 
          numPages={numPages} 
          isFirstPage={isFirstPage} 
          isLastPage={isLastPage} 
          prevPage={prevPage} 
          nextPage={nextPage}
        />
      </AnimatePage>
    </>
  );
}
export default BlogListTemplate;
