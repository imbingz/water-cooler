import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSocket } from './SocketProvider';

const ChatContext = createContext();

export function useChat() {
    return useContext(ChatContext);
}

export function ChatProvider({ children }) {
    const { socket, sessionId } = useSocket();
    const [chatReceived, setChatReceived] = useState();
    const [roomChat, setRoomChat] = useState([]);

    const roomPageUrl = document.URL;
    const roomUrlId = roomPageUrl.substring((roomPageUrl.length) - 36);

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
            } catch (err) {
                console.log({ err });
            }
        }, [roomUrlId]);
        
    const receiveChat = useCallback(
        async (received) => {
            try {
                const response = await fetch(
                    '/api/chat/create',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            message: received.message,
                            roomId: received.roomId,
                            userId: received.userId,
                            username: received.username
                        }),
                        method: 'POST'
                    }
                );
                await response.json();
            } catch (err) {
                console.log({ err });
            }
            populateChat();
        }, [populateChat]
    );


    useEffect(() => {
        if (!socket) {
            return;
        }
        populateChat();

        socket.emit('set-id', sessionId);
    }, [socket, sessionId, populateChat]);

    const sendChat = (message, roomId, userId, username) => {
        console.log('sent message');
        socket.emit('send-chat', message, roomId, userId, username);
    };

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('receive-chat', (message, roomId, userId, username, socketId) => {
            const receivedAt = Date.now();
            const received = {
                message: message,
                roomId: roomId,
                userId: userId,
                username: username,
                socketId: socketId,
                receivedAt: receivedAt
            };
            console.log(received);
            setChatReceived(received);
            if (sessionId === socketId) {
                receiveChat(received);
            }
            populateChat();
        });
        return () => socket.off('receive-chat');
    }, [socket, sessionId, receiveChat, populateChat]);

    return (
        <ChatContext.Provider value={{ sendChat, roomChat, chatReceived }}>
            {children}
        </ChatContext.Provider>
    );
}
