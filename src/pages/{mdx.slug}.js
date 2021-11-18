import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Seo from 'react-seo-component';
import { FastCommentsCommentWidget } from 'fastcomments-react';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import useDarkMode from 'use-dark-mode';
import AnimatePage from '../components/AnimatePage';
import Tag from '../components/Tag';
import Toc from '../components/Toc';


export const query = graphql`
  query POST_BY_SLUG($slug: String) {
    postDetails: mdx(slug: {eq: $slug}) {
      id
      slug
      body
      excerpt
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
    }
    allTags: allMdx {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;


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
    frontmatter: { date, title, tags, cover },
    excerpt,
    body, 
  } = data.postDetails;

  const tagsWithCounts = data.allTags.group;

  const postTagsWithCounts = tagsWithCounts.filter(tag => {
    return tags.includes(tag.fieldValue);
  });

  const postImage = getImage(cover);

  const darkMode = useDarkMode();

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
          <div className={'mb-4'}>
            <p>{date}</p>
            <Link to={`/${slug}`}>
              <h1>{title}</h1>
            </Link>
            {postTagsWithCounts && (
              <ul className={'mx-0 list-unstyled'}>
                {postTagsWithCounts.map((tag)=>(
                  <li className={'small m-2 d-inline-block'}>
                    <Tag tag={tag} />
                  </li>
                ))}
              </ul>
            )}
            <GatsbyImage 
              image={postImage} 
              alt={'Blog post cover image.'} 
            />
          </div>
          <Toc />
          <div id="blog-post">
            <MDXRenderer>
              {body}
            </MDXRenderer>
          </div>
        </article>
        <div className={'mt-5'}>
          <FastCommentsCommentWidget 
            hasDarkBackground={darkMode.value ? true : false} 
            tenantId={process.env.GATSBY_FASTCOMMENTS_TENANTID}
          />
        </div>
      </AnimatePage>
    </>
  );
}

export default PostPage;
