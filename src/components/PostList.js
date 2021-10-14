import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PostCard from './PostCard';


const PostList = ({ postsData, tagsData }) => {

  return(
    <Container className={'p-0'}>
      <Row>
        {postsData.map((post) => {
          const { slug, excerpt, timeToRead } = post;
          const { date, title, tags, image } = post.frontmatter;
          return(
            <Col xs={12} sm={12} md={12} lg={12} xl={6}>
              <PostCard 
                slug={slug} 
                date={date} 
                postImageUrl={image} 
                timeToRead={timeToRead}
                title={title} 
                excerpt={excerpt} 
                tags={tags}
                tagsWithCounts={tagsData} 
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
export default PostList;