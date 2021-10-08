import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import SEO from 'react-seo-component';
import { useSiteMetadata } from '../hooks/use-site-metadata';

import MotionDiv from '../components/MotionDiv';

// todo: get rid of excerpt
export const query = graphql`
  query POST_BY_SLUG($slug: String) {
    mdx(slug: {eq: $slug}) {
      id
      slug
      body
      excerpt
      frontmatter {
        title
        date(formatString: "YYYY MMMM Do")
        tags
      }
    }
  }
`;

// single post
const PostPage = ({ data }) => {
  const { 
    slug,
    frontmatter: { title, date, tags },
    excerpt,
    body, 
  } = data.mdx;

  const {
    title: siteTitle,
    siteUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
    authorName
  } = useSiteMetadata();

  alert(title)

  return(
    <>
      <SEO
        title={`Post Detail`}
        titleTemplate={siteTitle}
        description={excerpt}
        pathname={`${siteUrl}${slug}`}
        article={true}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
        author={authorName}
        publishedDate={date}
        modifiedDate={new Date(Date.now()).toISOString()}
      />
      <MotionDiv>
        <article>
          <p>{date}</p>
          <h1>{title}</h1>
          {tags && (
            <>
              {tags.map((tag)=>(
                <Link to={`/tags/${tag}`}>
                  <span>{tag}</span>
                </Link>
              ))}
            </>
          )}
          <MDXRenderer>{body}</MDXRenderer>
        </article>
      </MotionDiv>
    </>
  );
}

export default PostPage;
