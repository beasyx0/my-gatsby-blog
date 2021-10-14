import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Seo from 'react-seo-component';

import { useSiteMetadata } from '../hooks/use-site-metadata';
import AnimatePage from '../components/AnimatePage';
import { formatDate } from '../utils';

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
        date(formatString: "MMMM Do YYYY h:mm a")
        tags
      }
    }
  }
`;

// single post
const PostPage = ({ data }) => {

  const {
    title: siteTitle,
    siteUrl,
    siteImageUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
    authorName
  } = useSiteMetadata();

  const { 
    slug,
    frontmatter: { title, date, tags },
    excerpt,
    body, 
  } = data.mdx;

  const dateForDisplay = formatDate(date);

  return(
    <>
      <Seo
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
      <AnimatePage>
        <article>
          <p>{date}</p>
          <h1>{title}</h1>
          {tags && (
            <p>
              {tags.map((tag)=>(
                <Link key={tag} to={`/tags/${tag}/`}>
                  <span>{tag}</span>
                </Link>
              ))}
            </p>
          )}
          <MDXRenderer>{body}</MDXRenderer>
        </article>
      </AnimatePage>
    </>
  );
}

export default PostPage;
