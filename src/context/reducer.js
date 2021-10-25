const userThemeChoice = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'dark';

export const appInitialState = {
  themeChoice: userThemeChoice,
}

export const appReducer = (appInitialState, action) => {
  switch (action.type) {
    case "SWITCH_THEME":
      return {
        ...appInitialState,
        themeChoice: action.themeChoice,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
