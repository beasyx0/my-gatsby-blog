import 'bootstrap/dist/css/bootstrap.min.css';

import './root-styles.css';

import rootWrapper from "./root-wrapper";

import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import duotoneLite from 'prism-react-renderer/themes/duotoneLight';
import duotoneDark from 'prism-react-renderer/themes/duotoneDark';
/* eslint-disable */
const component = {
  pre: props => {
    const className = props.children.props.className || '';
    const matches = className.match(/language-(?<lang>.*)/);
    const userThemeChoice = window.localStorage.getItem('theme') === 'dark' ? duotoneDark : duotoneLite
    return (
      <Highlight
        {...defaultProps}
        code={props.children.props.children.trim()}
        language={
          matches && matches.groups && matches.groups.lang
            ? matches.groups.lang
            : ''
        }
        theme={userThemeChoice}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
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
export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={component}>{element}</MDXProvider>;
};

export const wrapPageElement = rootWrapper;


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
