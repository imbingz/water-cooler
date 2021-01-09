import { createContext, useContext, useReducer } from 'react';

export const GlobalContext = createContext();

const defaultState = {
    rooms: [],
    socialSpaces: [],
    currentRoom: [],
    currentSocialSpace: [],
    showAside: true,
    roomStyle:''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'getAll':
            return {
                ...state,
                rooms: action.payload,
                socialSpaces: action.payload
            };
        case 'popOne':
            return {
                ...state,
                currentRoom: action.payload,
                currentSocialSpace: action.payload
            };
        case 'setShowAside':
            return {
                ...state,
                showAside: action.payload
            };
        case 'setRoomStyle':
            return {
                ...state,
                roomStyle: action.payload
            };
        default: return state;
    }
};

const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    return (
        <GlobalContext.Provider value={[state, dispatch]} {...props} />
    );

};

export default GlobalProvider;

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};