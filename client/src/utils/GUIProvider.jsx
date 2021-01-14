import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSocket } from './SocketProvider';

const GUIContext = createContext();

export function useGUI() {
    return useContext(GUIContext);
}

export function GUIProvider({ children }) {
    const [player, setPlayer] = useState('');
    const [players, setPlayers] = useState({});
    /***************************** Bing 
        new player  obj is :
        {"id":"0aYC7eFLb9qfs_F4AAAN","name":0.42344489395629115}
    ***************/
    const [greeting, setGreeting] = useState('');
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

        socket.on('connect_error', err => {
            console.log(err);
        });
        
        /********************************
            state plyrs: {"VEf-RG4xQsUqPWgpAAAF":{"x":0,"y":0},"QONco2PVTxzwGBjsAAAL":{"x":0,"y":0},"BiKQtjhxPP6g2fCFAAAN":{"x":255,"y":100},"ILWM32u5CTcQ6WWIAAAP":{"x":204,"y":427},"xWvlzx5m98uL4TvjAAAX":{"x":292,"y":264},"YhN8HnUv51JGxliaAAAZ":{"x":407,"y":234}}
        **************************** */

        socket.on('state', (state) => {
            if (!state) { return; } console.log(state);
            const { players, message } = state;
            console.log(`state plyrs: ${JSON.stringify(players)}`);
            setPlayers(players);
            if (message) { setGreeting(message); }
            else { setGreeting(''); }
        });

        socket.on('greeting', msg => {
            console.log(msg);
            setGreeting(msg);
        });

        if (player) {
            console.log(`hit player useEffect(): ${JSON.stringify(player)}`);
            // socket.emit('new player', player);
        }

        return () => socket.off('receive-chat');
    }, [socket, random, player]);

    
    const emitMovement = (position) => {
        socket.emit('movement', position);
    };

    return (
        <GUIContext.Provider value={{ player, players, greeting, emitMovement }}>
            {children}
        </GUIContext.Provider>
    );
}
