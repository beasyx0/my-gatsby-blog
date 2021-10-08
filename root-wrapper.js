import React from 'react';
import {AnimatePresence} from 'framer-motion';
import Layout from './src/components/Layout';


const rootWrapper = ({ element }) => {
  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>
        {element}
      </AnimatePresence>
    </Layout>
  );
}
export default rootWrapper;
