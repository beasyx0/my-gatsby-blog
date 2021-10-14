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

  const postTagsWithCounts = {}

  tags && (
    tags.forEach((tag)=>{
      tagsWithCounts.forEach((tagg)=>{
        if (tagg.fieldValue === tag) {
          postTagsWithCounts[tag] = tagg.totalCount;
        }
      })
    })
  )

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
            {Object.entries(postTagsWithCounts).map(([key, value])=>{
              return(
                <li className={'m-1 d-inline-block'}>
                  <Link key={key} to={`/tags/${_.kebabCase(key)}/`}>
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
                        {key} {value}
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
