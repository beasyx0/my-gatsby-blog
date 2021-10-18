import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import _ from 'lodash';

import useDarkMode from 'use-dark-mode';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import { useAppState } from '../Context';
import ShareButtons from './ShareButtons';


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

  const darkMode = useDarkMode();

  const shareUrl = window.location.href + slug;

  const postTagsWithCounts = tagsWithCounts.filter(tag => {
    return tags.includes(tag.fieldValue);
  });

  return(
    <Card key={slug} className={'mb-4 p-2 bg-transparent shadow post-card-scale-on-hover'}>
      <GatsbyImage image={postImage} alt={'author'} />
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
            {postTagsWithCounts.map((tag)=>{
              return(
                <li className={'m-1 d-inline-block'}>
                  <Link key={tag.fieldValue} to={`/tags/${_.kebabCase(tag.fieldValue)}/`}>
                    <Badge 
                      bg={`${darkMode.value ? 'dark' : 'light'}`} 
                      className={`(
                        shadow-sm border ${darkMode.value && 'border-secondary'} rounded scale-on-hover
                      )`}
                      style={{
                        transition: darkMode.value === 'light' ? 'background-color 16.5s ease' : ''
                      }}
                    >
                      <small className={'text-primary'}>
                        {tag.fieldValue} {tag.totalCount}
                      </small>
                    </Badge>
                  </Link>
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
