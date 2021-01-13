import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGlobalContext } from '../utils/GlobalContext';
import { useSocket } from './SocketProvider';

const ChatContext = createContext();

// localStorage.clear();


export function useChat() {
    return useContext(ChatContext);
}

export function ChatProvider({ children }) {
    const [lastChat, setLastChat] = useState('');
    const [roomChat, setRoomChat] = useState('');
    const [state, dispatch] = useGlobalContext();
    const socket = useSocket();
    console.log('This is the socket', socket);
    const roomPageUrl = document.URL;
    let roomUrlId = roomPageUrl.substring((roomPageUrl.length) - 36);
    // console.log(currentRoomId);
    
    useEffect(() => {
        const populateChat = async () => {
            try {
                const response = await fetch(
                    '/api/chat/get',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            roomId: roomUrlId
                        }),
                        method: 'POST'
                    }
                );
                const json = await response.json();
                console.log(json);
                setRoomChat(json.data);
            } catch (err) {
                console.log({ err });
            }
        };
        populateChat();

        if (socket == null) {
            return;
        }

        socket.on('set-id', id => {
            socket.id = id;
            console.log(socket);
        })
        
        socket.on('receive-chat', (message, roomId, userId, username) => {
            // receiveChat(message, roomId, userId, username);
            console.log('this is how many times receive chat is being received');
        });
        
        return () => socket.off('receive-chat');
    }, [socket, dispatch, roomUrlId, lastChat]);
    
    const sendChat = (message, roomId, userId, username) => {
        console.log(socket.id);
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
                        userId: userId,
                        username: username
                    }),
                    method: 'POST'
                }
            );
            const json = await response.json();
            setLastChat(json.data._id);
        } catch (err) {
            console.log({ err });
        }
    };


    return (
        <ChatContext.Provider value={{sendChat, roomChat} }>
            {children}
        </ChatContext.Provider>
    );
}
