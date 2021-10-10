import React from 'react';
import { Link } from 'gatsby';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import { useAppState } from '../Context';
import ShareButtons from './ShareButtons';


const PostCard = (postDetails) => {

  const state = useAppState();

  const { 
    slug, 
    date, 
    postImageUrl, 
    timeToRead, 
    title, 
    excerpt, 
    tags, 
  } = postDetails;

  const shareUrl = window.location.href + slug;

  return(
    <Card key={slug} className={'mb-4 p-2 bg-transparent shadow'}>
      <Card.Img variant="top" src={postImageUrl} className={'mb-0'} />
      <Card.Body>
        <small className={'m-0 text-secondary'}>
          {date} | {timeToRead} min read
        </small>
        <Card.Title>
          <Link to={`/${slug}`}>
            <h1>{title}</h1>
          </Link>
        </Card.Title>
        <Card.Text>
          {excerpt}
        </Card.Text>
        {tags && (
          <ul className={'m-0 list-unstyled'}>
            {tags.map((tag) => (
              <li className={'m-1 d-inline-block'}>
                <Link key={tag} to={`/tags/${tag}/`}>
                  <Badge 
                    bg={state.themeChoice} 
                    className={'scale-on-hover shadow border border-primary rounded'}
                  >
                    <small className={'text-primary'}>
                      {tag}
                    </small>
                  </Badge>
                </Link>
              </li>
            ))}
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
