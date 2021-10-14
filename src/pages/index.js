import React from 'react';
import { graphql } from 'gatsby';
import Seo from "react-seo-component";
import { useSiteMetadata } from "../hooks/use-site-metadata";

// import usePosts from '../hooks/use-posts';
import AnimatePage from '../components/AnimatePage';
import PostList from '../components/PostList';


export const query = graphql`
  query SITE_INDEX_QUERY {
    allPosts: allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "MMMM Do, YYYY @ h:mm a")
          tags
          image
        }
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
const IndexPage = ({data}) => {

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

  return(
    <>
      <Seo
        title={`Home`}
        titleTemplate={title}
        titleSeperator={'-'}
        description={description}
        pathname={siteUrl}
        image={siteImageUrl}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
        author={authorName}
      />
      <AnimatePage>
        <PostList postsData={posts} tagsData={tags}  />
      </AnimatePage>
    </>
  );
}
export default IndexPage;
