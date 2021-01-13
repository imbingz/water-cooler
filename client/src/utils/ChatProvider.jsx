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
        
        socket.on('receive-chat', (message, roomId, userId, username) => {
            console.log('made it back to receive chat socket on', (message + roomId + userId + username));
            receiveChat(message, roomId, userId, username);
        });
        
        return () => socket.off('receive-messag');
    }, [socket]);
    
    const sendChat = (message, roomId, userId, username) => {
        console.log('send-chat from ChatProvider', (`${message} | ${roomId} | ${userId} | ${username}`));
        socket.emit('send-chat', message, roomId, userId, username);
    };

    const receiveChat = async (message, roomId, userId, username) => {
        try {
            const response = await fetch(
                '/api/chat/create',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: message,
                        roomId: roomId, 
                        userId: userId
                    }),
                    method: 'POST'
                }
            );
            const json = await response.json();
            console.log(json);
        } catch (err) {
            console.log({ err });
        }
    };

    return (
        <ChatContext.Provider value={{sendChat} }>
            {children}
        </ChatContext.Provider>
    );
}
