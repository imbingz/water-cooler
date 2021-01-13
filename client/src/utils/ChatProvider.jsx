import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
    const roomPageUrl = document.URL;
    let roomUrlId = roomPageUrl.substring((roomPageUrl.length) - 36);

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
                return;
            }
            populateChat();
        });

        return () => socket.off('receive-chat');
    }, [socket, dispatch, roomUrlId, lastChat, populateChat]);

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

    // const populateChat = async () => {
    // try {
    //     const response = await fetch(
    //         '/api/chat/get',
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 roomId: roomUrlId
    //             }),
    //             method: 'POST'
    //         }
    //     );
    //     const json = await response.json();
    //     console.log(json);
    //     setRoomChat(json.data);
    // } catch (err) {
    //     console.log({ err });
    // }
    // };

    return (
        <ChatContext.Provider value={{ sendChat, roomChat }}>
            {children}
        </ChatContext.Provider>
    );
}
