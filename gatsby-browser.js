import 'bootstrap/dist/css/bootstrap.min.css';

import './root-styles.css';

import rootWrapper from "./root-wrapper";

export const wrapPageElement = rootWrapper;

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  const TRANSITION_DELAY = 0.3 * 1000 * 2
  // if it's a normal route push it
  if (location.action === 'PUSH') {
    window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY)
  }
  // if we used the browser's forward or backward button
  else {
    const savedPostion = getSavedScrollPosition(location) || [0,0]
    window.setTimeout(() => window.scrollTo(...savedPostion), TRANSITION_DELAY)
  }

  return false
}
