import React, { createContext, useReducer, useContext } from "react";

import {appReducer, appInitialState} from './reducer.js';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a Provider");
  }

  return context;
}

export function useAppDispatch() {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a Provider")
  }
  return context;
}

export const AppContextProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(appReducer, appInitialState);

  return (
    <AppStateContext.Provider value={appState}>
      <AppDispatchContext.Provider value={appDispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
