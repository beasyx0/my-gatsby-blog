import React from 'react';
import { FaCopy } from 'react-icons/fa';

import { copyToClipboard } from '../utils';


const CopyButton = (codeStr) => {

  const { codeToCopy } = codeStr;

  const handleCopyToClipboard = () => {
    copyToClipboard(codeToCopy);
  }

  const copyButtonStyle = {
    position: 'absolute',
    left: '90%',
  }

  return(
    <div 
      role="button"
      style={copyButtonStyle}
      className={'scale-on-hover'}
    >
      <FaCopy 
        className={'h6 text-success'} 
        onClick={handleCopyToClipboard} 
      />
    </div>
  );
}

export default CopyButton;
