import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

import { copyToClipboard } from '../utils';


const CopyButton = (codeStr) => {

  const [copied, setCopied] = useState();
  const { codeToCopy } = codeStr;

  const handleCopyToClipboard = () => {
    copyToClipboard(codeToCopy);
    setCopied(true);
  }

  return(
    <div 
      className={'d-flex justify-content-end'} 
    >
      <p className={'mx-2 text-success'}>
        <span className={`${copied ? 'opacity-100' : 'opacity-0'}`}>Copied!</span>
      </p>
      <FaCopy 
        className={'h5 text-primary scale-on-hover'} 
        onClick={handleCopyToClipboard} 
        role="button"
      />
    </div>
  );
}

export default CopyButton;
