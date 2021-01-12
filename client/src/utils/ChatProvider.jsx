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
        
        socket.on('receive-message', message => {
            console.log('made it back to chat provider', message);
            // setServerMessage(message);
        });
        
        return () => socket.off('test');
    }, [socket, serverMessage]);
    
    const fromChat = (message) => {
        console.log('send-message from ChatProvider');
        socket.emit('send-message', message);
    };

    return (
        <ChatContext.Provider value={{fromChat} }>
            {children}
        </ChatContext.Provider>
    );
}
