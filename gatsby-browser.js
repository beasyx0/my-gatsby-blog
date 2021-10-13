import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './root-styles.css';
import { MDXProvider } from '@mdx-js/react';
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from 'react-live'
import Highlight, { defaultProps } from 'prism-react-renderer';
import duotoneLite from 'prism-react-renderer/themes/duotoneLight';
import duotoneDark from 'prism-react-renderer/themes/duotoneDark';
import {AnimatePresence} from 'framer-motion';
import Button from 'react-bootstrap/Button';
import theme from 'prism-react-renderer/themes/nightOwl';

import { AppContextProvider } from './src/Context';
import Layout from './src/components/Layout';
import CopyButton from './src/components/CopyButton';
import { useAppState } from './src/Context';


/* eslint-disable */
const component = {

  pre: props => {
    const codeString = props.children.props.children.trim();
    const isReactLive = props.children.props['react-live'];
    const className = props.children.props.className || '';
    const matches = className.match(/language-(?<lang>.*)/);
    const lang = matches && matches.groups && matches.groups.lang
                  ? matches.groups.lang
                  : ''
    
    const context = useAppState();
    const userThemeChoice = context.themeChoice === 'dark' ? duotoneDark : duotoneLite;

    

    if (isReactLive) {
      return (
        <LiveProvider code={codeString} noInline={true} theme={theme}>
          <LiveEditor />
          <LiveError />
          <LivePreview />
        </LiveProvider>
      )
    }

    return (
      <Highlight
        {...defaultProps}
        code={codeString}
        language={lang}
        theme={userThemeChoice}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            <CopyButton codeToCopy={codeString} />
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  },
};

export const wrapPageElement = ({ element }) => {
  return (
    <Layout>
      <MDXProvider components={component}>
        <AnimatePresence exitBeforeEnter>
          {element}
        </AnimatePresence>
      </MDXProvider>
    </Layout>
  );
}

export const wrapRootElement = ({ element }) => {
  return (
    <AppContextProvider>
      {element}
    </AppContextProvider>
  );
};


// export const wrapPageElement = rootWrapper;

// export const shouldUpdateScroll = ({
//   routerProps: { location },
//   getSavedScrollPosition
// }) => {
//   const TRANSITION_DELAY = 0.3 * 1000 * 2
//   // if it's a normal route push it
//   if (location.obj) {
//     window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY)
//   }
//   // if we used the browser's forward or backward button
//   else {
//     const savedPostion = getSavedScrollPosition(location) || [0,0]
//     window.setTimeout(() => window.scrollTo(...savedPostion), TRANSITION_DELAY)
//   }

//   return false
// }
