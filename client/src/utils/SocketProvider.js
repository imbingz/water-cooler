import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

// takes ID to send up to server
export function SocketProvider({ children }) {
    const [socket, setSocket] = useState();
    // sets up socket when page is initially loaded or if the id changes
    useEffect(() => {

        async function sessionId() {
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
                const json = await response.json();
                const id = json.sessionID;
                const newSocket = io(
                    '/',
                    { query: { id }}
                );
                setSocket(newSocket);
                // if useEffect runs again it closes this socket
                return () => newSocket.close();
            } catch (err) {
                console.log({ err });
            }
        }
        sessionId();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

