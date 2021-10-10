import React from 'react';
import { motion } from 'framer-motion';


const AnimatePage = ({ children }) => {
  return(
    <motion.div
      initial={{
        opacity: 0,
        transition: {
          duration: 0.08,
        }
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.08,
        }
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.08,
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatePage;