import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import SEO from 'react-seo-component';

import { useSiteMetadata } from '../hooks/use-site-metadata';
import MotionDiv from '../components/MotionDiv';
import formatDate from '../utils';

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
        date
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

  const dateForDisplay = formatDate(date);

  const {
    title: siteTitle,
    siteUrl,
    siteImageUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
    authorName
  } = useSiteMetadata();

  return(
    <>
      <SEO
        title={`Post Detail`}
        titleTemplate={siteTitle}
        titleSeperator={'-'}
        description={excerpt}
        pathname={`${siteUrl}/${slug}`}
        article={true}
        image={siteImageUrl}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
        author={authorName}
        publishedDate={date}
        modifiedDate={new Date(Date.now()).toISOString()}
      />
      <MotionDiv>
        <article>
          <p>{dateForDisplay}</p>
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
