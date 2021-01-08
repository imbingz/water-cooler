import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

// takes ID to send up to server
export function SocketProvider({ id, children }) {
    const [socket, setSocket] = useState();

    // sets up socket when page is initially loaded or if the id changes
    useEffect(() => {
        const newSocket = io(
            '/',
        );
        setSocket(newSocket);

        // if useEffect runs again it closes this socket
        return () => newSocket.close();
    }, [id]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}