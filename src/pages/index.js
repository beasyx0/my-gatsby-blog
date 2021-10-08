import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from "react-seo-component";
import { useSiteMetadata } from "../hooks/use-site-metadata";

// import usePosts from '../hooks/use-posts';
import MotionDiv from '../components/MotionDiv';

import Dump from '../components/Dump';


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
        }
        slug
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
    <MotionDiv>
      {data.allMdx.nodes.map(({ id, excerpt, frontmatter, slug }) => (
        <article key={id} className={'mb-4 p-2 card shadow rounded text-dark'}>
            <p>{frontmatter.date}</p>
            <Link to={`/${slug}`}>
              <h1>{frontmatter.title}</h1>
            </Link>
            <p>{excerpt}</p>
            {frontmatter.tags && (
              <>
                {frontmatter.tags.map((tag)=>(
                  <p>{tag}</p>
                ))}
              </>
            )}
        </article>
      ))}
    </MotionDiv>
    </>
  );
}
export default IndexPage;
