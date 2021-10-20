import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import Card from 'react-bootstrap/Card';
import { FaGithub, FaCircle } from 'react-icons/fa';


const GitHubWidget = () => {

  const gitHubWidgetStyles = {
    height: '400px',
  }

  const gitHubRepoCardContainerStyles = {
    overflowY: 'scroll',
    paddingRight: '5px'
  }

  const gitHubAvatarStyles = {
    width: '25px',
  }

  const gitHubRepoUpdatedAtStyles = {
    fontSize: '12px'
  }

  const gitHubRepoLanguageNameStyles = {
    fontSize: '12px',
    marginRight: '10px'
  }

  return(
    <StaticQuery
      query={graphql`
        query {
          githubData {
            data {
              viewer {
                avatarUrl
                url
                repositories {
                  totalCount
                  nodes {
                    createdAt(formatString: "MMMM Do, YYYY @ h:mm a")
                    updatedAt(formatString: "MMMM Do, YYYY @ h:mm a")
                    name
                    url
                    description
                    languages {
                      nodes {
                        color
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => (
        <Card className={'mb-4 p-2 bg-transparent shadow'} style={gitHubWidgetStyles}>
          <div className={'d-flex justify-content-between'}>
            <Card.Title>
              <h3 className={'h5'}>
                <FaGithub />{' '}
                Repos{' '}
                ({data.githubData.data.viewer.repositories.totalCount})
              </h3>
            </Card.Title>
            <a href={data.githubData.data.viewer.url} target="_blank" rel="noreferrer">
              <img 
                src={data.githubData.data.viewer.avatarUrl} 
                style={gitHubAvatarStyles} 
                className={'scale-on-hover'} 
                alt="GitHub avatar" 
              />
            </a>
          </div>
          <div style={gitHubRepoCardContainerStyles}>
            {data.githubData.data.viewer.repositories.nodes.map((repo)=>{
              return(
                <Card className={'mb-4 bg-transparent shadow shadow-sm'}>
                  <Card.Body>
                    <small style={gitHubRepoUpdatedAtStyles}>
                      {repo.updatedAt}
                    </small>
                    <Card.Title>
                      <a href={repo.url} target="_blank" rel="noreferrer">
                        <h5>{ repo.name }</h5>
                      </a>
                    </Card.Title>
                    {repo.languages.nodes.map((obj)=> (
                      <>
                        <span style={gitHubRepoLanguageNameStyles}>
                          <FaCircle style={{fontSize: '10px', color: `${obj.color}`}} />
                          {' '}
                          { obj.name }
                        </span>
                      </>
                    ))}
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Card>
      )}
    />
  );
}

export default GitHubWidget;
