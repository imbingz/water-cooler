import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSocket } from './SocketProvider';

const GUIContext = createContext();

export function useGUI() {
    return useContext(GUIContext);
}

export function GUIProvider({ children }) {
    const [player, setPlayer] = useState('');
    const [players, setPlayers] = useState({});
    const socket = useSocket();
    // const roomPageUrl = document.URL;
    // let roomUrlId = roomPageUrl.substring((roomPageUrl.length) - 36);
    const { v4: uuidv4 } = require('uuid');
    const random = uuidv4;

    useEffect(() => {
        if (socket == null) {
            return;
        }

        socket.on('set-id', id => {
            socket.id = id;
            setPlayer({ id: socket.id, name: random });
        });

        socket.on('connect_error', err => {
            console.log(err);
        });

        socket.on('state', (state) => {
            if (!state) { return; } 
            const { players } = state;
            setPlayers(players);
        });

        return () => socket.off('receive-chat');
    }, [socket, random, player]);

    
    const emitMovement = (position) => {
        socket.emit('movement', position);
    };

    return (
        <GUIContext.Provider value={{ player, players, emitMovement }}>
            {children}
        </GUIContext.Provider>
    );
}
