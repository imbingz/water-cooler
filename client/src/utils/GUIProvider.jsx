import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSocket } from './SocketProvider';

const ChatContext = createContext();

export function useChat() {
    return useContext(ChatContext);
}

export function ChatProvider({ children }) {
    const socket = useSocket();
    const roomPageUrl = document.URL;
    let roomUrlId = roomPageUrl.substring((roomPageUrl.length) - 36);
    const { v4: uuidv4 } = require('uuid');
    const random = uuidv4;

    useEffect(() => {
        if (socket == null) {
            return;
        }

        socket.on('set-id', id => {
            socket.id = id;
        });


        return () => socket.off('receive-chat');
    }, [socket]);

    return (
        <ChatContext.Provider>
            {children}
        </ChatContext.Provider>
    );
}
