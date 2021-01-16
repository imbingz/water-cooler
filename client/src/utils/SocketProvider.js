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
        console.log('getting session id');
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
            return async () => {
                try {
                    const response = await fetch(
                        '/api/user/logout',
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            method: 'POST'
                        }
                    );
                    const json = await response.json();
                    console.log(json);
                } catch (err) {
                    console.log(err);
                }
            };
        };
        getSessionId();
    }, [USER._id]);

    useEffect(() => {
        if (!sessionId) {
            return;
        }
        console.log('running create socket');
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
