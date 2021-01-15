import { createContext, useContext, useReducer } from 'react';

export const GlobalContext = createContext();

const defaultState = {
    rooms: [],
    socialSpaces: [],
    roomID: '',
    currentRoom: [],
    currentSocialSpace: [],
    showAside: false,
    roomStyle:localStorage.getItem('roomImg'),
    //global USER
    USER: JSON.parse(localStorage.getItem('USER'))
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
        case 'setUser':
            return {
                ...state,
                USER: action.payload
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