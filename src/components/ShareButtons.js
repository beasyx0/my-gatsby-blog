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


const ShareButtons = ({ urlToShare, titleToShare, tags }) => {

  return(
    <div className={'my-3 text-center'}>
      <RedditShareButton 
        url={urlToShare} 
        title={titleToShare} 
      >
        <RedditIcon 
          size={28} 
          round={true} 
          className={'mx-3 scale-on-hover'}
        />
      </RedditShareButton>
      <TwitterShareButton 
        url={urlToShare} 
        title={titleToShare} 
        hashtags={tags} 
      >
        <TwitterIcon 
          size={28} 
          round={true} 
          className={'mx-3 scale-on-hover'}
        />
      </TwitterShareButton>
      <FacebookShareButton
        url={urlToShare} 
      >
        <FacebookIcon 
          size={28} 
          round={true} 
          className={'mx-3 scale-on-hover'}
        />
      </FacebookShareButton>
      <EmailShareButton
        url={urlToShare} 
        subject={titleToShare} 
      >
        <EmailIcon 
          size={28} 
          round={true} 
          className={'mx-3 scale-on-hover'}
        />
      </EmailShareButton>
    </div> 
  );
}

export default ShareButtons;
