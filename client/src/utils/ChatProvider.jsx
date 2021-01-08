import React, { useContext, useEffect } from 'react';
import { useSocket } from './SocketProvider';

const ChatContext = React.createContext();

export function useChat() {
    return useContext(ChatContext);
}

export function ConversationsProvider({ id, children }) {
    const socket = useSocket();

    useEffect(() => {
        if (socket == null) return;

        socket.on('test', 'hi from chat provider');

        return () => socket.off('test');
    }, [socket]);

    return (
        <ChatContext.Provider>
            {children}
        </ChatContext.Provider>
    );
}