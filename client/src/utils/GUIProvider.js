import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGlobalContext } from '../utils/GlobalContext';
import { useSocket } from './SocketProvider';

const GUIContext = createContext();

export function useGUI() {
    return useContext(GUIContext);
}

export function GUIProvider({ children }) {
    const [{ USER },] = useGlobalContext();
    const username = USER.username;
    const [player, setPlayer] = useState('');
    const [players, setPlayers] = useState({});
    const { socket, sessionId } = useSocket();

    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.emit('set-id', sessionId);
        setPlayer({ id: sessionId, username });
    }, [socket, sessionId, username]);


    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('state', (state) => {
            if (!state) { return; }
            const { players } = state;
            setPlayers(players);
        });

        return () => socket.off('state');
    }, [socket, player]);

    useEffect(() => {
        if(!socket ) {return;} 
        if ( player.id) {
            socket.emit('new player', player);
        }

        return () => socket.off('new player');
        
    }, [player, socket]);

    const emitMovement = (position) => {
        socket.emit('movement', position);
    };

    return (
        <GUIContext.Provider value={{ player, players, emitMovement }}>
            {children}
        </GUIContext.Provider>
    );
}
