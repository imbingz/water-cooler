import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGlobalContext } from '../utils/GlobalContext';
import io from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }) {
    const [{ USER }] = useGlobalContext();
    const [socket, setSocket] = useState();
    const [sessionId, setSessionId] = useState();

    useEffect(() => {
        const getSessionId = async () => {
            try {
                const response = await fetch(
                    '/api/socket/id',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST'
                    }
                );
                const { sessionID } = await response.json();
                setSessionId(sessionID);
            } catch (err) {
                console.log(err);
            }
        };
        getSessionId();
    }, [USER._id]);

    useEffect(() => {
        const createSocket = () => {
            const newSocket = io(
                '/',
                { query: { sessionId }}
            );
            setSocket(newSocket);
            return () => newSocket.close();
        };
        createSocket();
    }, [sessionId]);

    return (
        <SocketContext.Provider value={{ socket, sessionId }}>
            {children}
        </SocketContext.Provider>
    );
}
