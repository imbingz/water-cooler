import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSocket } from './SocketProvider';

const ChatContext = createContext();

export function useChat() {
    return useContext(ChatContext);
}

export function ChatProvider({ children }) {
    const [lastChat, setLastChat] = useState('');
    const [roomChat, setRoomChat] = useState('');
    const socket = useSocket();
    const roomPageUrl = document.URL;
    let roomUrlId = roomPageUrl.substring((roomPageUrl.length) - 36);
    const { v4: uuidv4 } = require('uuid');

    const populateChat = useCallback(
        async () => {
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
                setRoomChat(json.data);
                setLastChat('');
            } catch (err) {
                console.log({ err });
            }
        },
        [setRoomChat, roomUrlId],
    );

    useEffect(() => {
        if (socket == null) {
            return;
        }

        populateChat();

        socket.on('set-id', id => {
            socket.id = id;
        });

        socket.on('receive-chat', (message, roomId, userId, username, socketId) => {
            if (socket.id === socketId) {
                receiveChat(message, roomId, userId, username);
                populateChat();
                return;
            }
            const random = uuidv4();
            setLastChat(random);
            populateChat();
            return;
        });

        return () => socket.off('receive-chat');
    }, [socket, populateChat, lastChat, uuidv4]);

    const sendChat = (message, roomId, userId, username) => {
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
        <ChatContext.Provider value={{ sendChat, roomChat }}>
            {children}
        </ChatContext.Provider>
    );
}
