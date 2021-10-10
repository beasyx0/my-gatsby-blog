import React from 'react';
import { Link } from 'gatsby';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import { useAppState } from '../Context';


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

  return(
    <Card key={slug} className={'mb-4 p-2 bg-transparent shadow'}>
      <Card.Img variant="top" src={postImageUrl} />
      <Card.Body>
        <p className={'m-0'}>
          {date} | {timeToRead} min read
        </p>
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
              <Link key={tag} to={`/tags/${tag}/`}>
                <li className={'m-1 d-inline-block shadow'}>
                  <Badge bg={state.themeChoice}>
                    <small className={'text-primary'}>
                      {tag}
                    </small>
                  </Badge>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>      
  );
}
export default PostCard;
