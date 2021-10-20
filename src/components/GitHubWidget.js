import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import useDarkMode from 'use-dark-mode';

import Card from 'react-bootstrap/Card';
import { FaGithub } from 'react-icons/fa';


const GitHubWidget = () => {

  const darkMode = useDarkMode();

  const gitHubAvatarStyles = {
    width: '25px',
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
        <Card className={'mb-4 p-2 bg-transparent shadow'}>
          <div className={'d-flex justify-content-between'}>
            <Card.Title>
              <h3 className={'h5'}><FaGithub />{' '}GitHub Repos</h3>
            </Card.Title>
            <a href={data.githubData.data.viewer.url} target="_blank" rel="noreferrer">
              <img src={data.githubData.data.viewer.avatarUrl} style={gitHubAvatarStyles} className={'scale-on-hover'} alt="GitHub avatar" />
            </a>
          </div>
          {data.githubData.data.viewer.repositories.nodes.map((repo)=>{
            return(
              <Card className={'mb-4 bg-transparent shadow shadow-sm scale-on-hover'}>
                <Card.Body>
                  <Card.Title>
                    <a href={repo.url} target="_blank" rel="noreferrer">
                      <h6>{ repo.name }</h6>
                    </a>
                  </Card.Title>
                </Card.Body>
              </Card>
            );
          })}
        </Card>
      )}
    />
  );
}

export default GitHubWidget;
