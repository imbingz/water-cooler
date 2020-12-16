import { createContext, useContext, useReducer } from 'react';

export const GlobalContext = createContext();

const defaultState = {
  rooms: []
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'addRooms':
      return {
        ...state,
        rooms: action.payload
      };
    default: return state;
  }
};

const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <GlobalContext.Provider value={[state, dispatch]} {...props} />
  )

}

export default GlobalProvider;

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}