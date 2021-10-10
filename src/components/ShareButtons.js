import React from 'react';
import { 
  RedditShareButton, 
  RedditIcon, 
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';


const ShareButtons = (props) => {

  const { urlToShare, titleToShare, tags } = props;

  return(
    <div className={'my-3'}>
      <RedditShareButton 
        url={urlToShare} 
        title={titleToShare} 
      >
        <RedditIcon 
          size={26} 
          round={true} 
          className={'scale-on-hover'}
        />
      </RedditShareButton>
      <TwitterShareButton 
        url={urlToShare} 
        title={titleToShare} 
        hashtags={tags} 
        style={{ marginLeft: '20px' }}
      >
        <TwitterIcon 
          size={26} 
          round={true} 
          className={'scale-on-hover'}
        />
      </TwitterShareButton>
      <FacebookShareButton
        url={urlToShare} 
        style={{ marginLeft: '20px' }}
      >
        <FacebookIcon 
          size={26} 
          round={true} 
          className={'scale-on-hover'}
        />
      </FacebookShareButton>
      <EmailShareButton
        url={urlToShare} 
        subject={titleToShare} 
        style={{ marginLeft: '20px' }}
      >
        <EmailIcon 
          size={26} 
          round={true} 
          className={'scale-on-hover'}
        />
      </EmailShareButton>
    </div> 
  );
}

export default ShareButtons;
