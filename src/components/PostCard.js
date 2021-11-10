import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Card from 'react-bootstrap/Card';

import ShareButtons from './ShareButtons';
import Tag from './Tag';


const PostCard = (
  { 
    slug, 
    date, 
    postImageUrl, 
    timeToRead, 
    title, 
    excerpt, 
    tags, 
    cover,
    tagsWithCounts 
  }) => {

  const postImage = getImage(cover);

  // make sure this still works in production. Had to put the window check for gatsby-build
  const shareUrl = typeof window !== 'undefined' ? window.location.href + slug : '';

  const postTagsWithCounts = tagsWithCounts.filter(tag => {
    return tags.includes(tag.fieldValue);
  });

  return(
    <Card key={slug} className={'mb-4 p-2 bg-transparent shadow post-card-scale-on-hover'}>
      <GatsbyImage image={postImage} alt={'Blog post cover image.'} />
      <Card.Body className={'px-1'}>
        <small className={'m-0 text-secondary'}>
          {date} | {timeToRead} min read
        </small>
        <Link to={`/${slug}`}>
          <h2 className={'h3'}>{title}</h2>
        </Link>
        <Card.Text>
          <small>
          {excerpt}
          </small>
        </Card.Text>
        {tags && (
          <ul className={'m-0 list-unstyled'}>
            {postTagsWithCounts.map((tag)=>{
              return(
                <li className={'m-2 d-inline-block'}>
                  <Tag tag={tag} />
                </li>
              );
            })}
          </ul>
        )}
        <ShareButtons
          urlToShare={shareUrl} 
          titleToShare={title} 
          tags={tags}
        />
      </Card.Body>
    </Card>      
  );
}
export default PostCard;
