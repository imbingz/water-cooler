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
    const roomPageUrl = document.URL;
    let roomUrlId = roomPageUrl.substring((roomPageUrl.length) - 36);
    const { v4: uuidv4 } = require('uuid');
    const random = uuidv4;

    useEffect(() => {
        if (socket == null) {
            return;
        }
        
        console.log(player);

        socket.on('set-id', id => {
            socket.id = id;
            console.log('hit connect');
            setPlayer({ id: socket.id, name: random });
            console.log(`socket.id is ${socket.id}`);
        });

        // socket.on('connect', () => {

        // });


        return () => socket.off('receive-chat');
    }, [socket, random, player]);

    return (
        <GUIContext.Provider value={{ player }}>
            {children}
        </GUIContext.Provider>
    );
}
