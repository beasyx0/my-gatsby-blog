import React from 'react';
import { graphql } from 'gatsby';
import Seo from "react-seo-component";
import { useSiteMetadata } from "../hooks/use-site-metadata";

// import usePosts from '../hooks/use-posts';
import AnimatePage from '../components/AnimatePage';
import PostCard from '../components/PostCard';


export const query = graphql`
  query SITE_INDEX_QUERY {
    allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY MMMM Do")
          tags
          image
        }
        slug
        timeToRead
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

  const posts = data.allMdx.nodes;

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
        {posts.map((post) => {
          const { slug, excerpt, timeToRead } = post;
          const { date, title, tags, image } = post.frontmatter;
          return(
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
export default IndexPage;
