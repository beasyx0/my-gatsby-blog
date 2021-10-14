import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';

import useDarkMode from 'use-dark-mode';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import { useAppState } from '../Context';
import ShareButtons from './ShareButtons';


const PostCard = (postDetails) => {

  const darkMode = useDarkMode();

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
    <Card key={slug} className={'mb-4 p-2 bg-transparent shadow post-card-scale-on-hover'}>
      <Card.Img variant="top" src={postImageUrl} className={'mb-0'} />
      <Card.Body>
        <small className={'m-0 text-secondary'}>
          {date} | {timeToRead} min read
        </small>
        <Card.Title>
          <Link to={`/${slug}`}>
            <h2 className={'h4'}>{title}</h2>
          </Link>
        </Card.Title>
        <Card.Text>
          <small>
          {excerpt}
          </small>
        </Card.Text>
        {tags && (
          <ul className={'m-0 list-unstyled'}>
            {tags.map((tag) => (
              <li className={'m-1 d-inline-block'}>
                <Link key={tag} to={`/tags/${_.kebabCase(tag)}/`}>
                  <Badge 
                    bg={`${darkMode.value ? 'dark' : 'light'}`} 
                    className={`(
                      shadow-sm border ${darkMode.value && 'border-secondary'} rounded scale-on-hover
                    )`}
                    style={{
                      transition: 'background-color 0.5s ease'
                    }}
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
