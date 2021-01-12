import React, { createContext, useContext, useEffect } from 'react';
import { useSocket } from './SocketProvider';

const ChatContext = createContext();

// localStorage.clear();


export function useChat() {
    return useContext(ChatContext);
}

export function ChatProvider({ children }) {
    // const [chatMessage, setChatMessage] = useState('');
    const socket = useSocket();
    
    useEffect(() => {
        if (socket == null) {
            return;
        }
        
        socket.on('receive-chat', message => {
            console.log('made it back to receive chat socket on', message);
            receiveChat(message);
        });
        
        return () => socket.off('receive-messag');
    }, [socket]);
    
    const sendChat = (message) => {
        console.log('send-chat from ChatProvider');
        socket.emit('send-chat', message);
    };

    const receiveChat = (message) => {
        console.log('receive chat function: ', message);
    };

    return (
        <ChatContext.Provider value={{sendChat} }>
            {children}
        </ChatContext.Provider>
    );
}
