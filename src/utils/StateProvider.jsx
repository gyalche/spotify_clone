import { createContext, useContext, useReducer } from 'react';
import reducer, { initialState } from './reducer';

export const StateContext = createContext();

// const initialState = {
//   token: null,
// };
// const reducer = (state, action) => {
//   switch (action.type) {
//   }
// };
// import { reducerCases } from './constant';

export const StateProvider = ({ initialState, reducer, children }) => {
  // const [state, dispatch] = useReducer(initialState, reducer);
  // const value = { state, dispatch };

  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateProvider = () => useContext(StateContext);
