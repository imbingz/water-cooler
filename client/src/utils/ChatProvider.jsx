import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSocket } from './SocketProvider';

const ChatContext = createContext();

export function useChat() {
    return useContext(ChatContext);
}

export function ChatProvider({ children }) {
    const [serverMessage, setServerMessage] = useState('');
    const socket = useSocket();

    
    useEffect(() => {
        if (socket == null) {
            return;
        }
        
        socket.on('serverEmit', message => {
            console.log('made it back to chat provider');
            setServerMessage(message);
        });
        
        return () => socket.off('test');
    }, [socket, serverMessage]);
    
    const fromChat = (message) => {
        console.log(message);
        socket.emit('chatProvider', message);
    };

    return (
        <ChatContext.Provider value={{fromChat} }>
            {children}
        </ChatContext.Provider>
    );
}