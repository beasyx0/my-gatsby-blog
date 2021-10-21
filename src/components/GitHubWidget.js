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
    display: 'inline-block',
    fontSize: '12px',
    marginRight: '10px',
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
                    createdAt(formatString: "MMMM Do, YYYY")
                    updatedAt(formatString: "MMMM Do, YYYY")
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
            <h5>
              <FaGithub className={'text-light'} />
              {' '}
              Repos
              {' '}
              ({data.githubData.data.viewer.repositories.totalCount})
            </h5>
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
                      Updated: {repo.updatedAt}
                    </small>
                    <h5>
                      <a href={repo.url} target="_blank" rel="noreferrer">
                        { repo.name }
                      </a>
                    </h5>
                    {repo.languages.nodes.map((obj)=> (
                      <>
                        <span style={gitHubRepoLanguageNameStyles}>
                          <FaCircle style={{ paddingBottom: '2px', fontSize: '10px', color: `${obj.color}`}} />
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
