import React, { useEffect, useRef } from 'react';
import { useEthers } from '@usedapp/core';

import Jazzicon from '@metamask/jazzicon';


const Identicon = () => {

  const ref = useRef();
  const { account } = useEthers();

  const identiconStyles = {
    width: '1rem',
    height: '1rem',
  }

  useEffect(()=>{
    if (account && ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(Jazzicon(14, parseInt(account.slice(2, 10), 16)));
    }
  }, [account])

  return(
    <div ref={ref} style={identiconStyles} className={'px-1 d-inline bg-dark'}></div>
  );

}
export default Identicon;
