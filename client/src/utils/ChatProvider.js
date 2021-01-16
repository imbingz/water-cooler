import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSocket } from './SocketProvider';

const ChatContext = createContext();

export function useChat() {
    return useContext(ChatContext);
}

export function ChatProvider({ children }) {
    const { socket, sessionId } = useSocket();

    const [currentSocket, setCurrentSocket] = useState(socket);
    // const [timeReceived, setTimeRecieved] = useState();
    const [roomChat, setRoomChat] = useState([]);

    useEffect(() => {
        if (!currentSocket) {
            return;
        }

        currentSocket.on('set-id', id => {
            console.log(id);
            setCurrentSocket(socket);
        });

        currentSocket.on('receive-chat', (message, roomId, userId, username, socketId) => {
            console.log('received chat');
            receiveChat(message, roomId, userId, username, socketId);
        });
    });

    const sendChat = (message, roomId, userId, username) => {
        console.log('sent message');
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
            console.log(json);
        } catch (err) {
            console.log({ err });
        }
    };
    // const populateChat = useCallback(
    //     async () => {
    //         try {
    //             const response = await fetch(
    //                 '/api/chat/get',
    //                 {
    //                     headers: {
    //                         'Content-Type': 'application/json'
    //                     },
    //                     body: JSON.stringify({
    //                         roomId: roomUrlId
    //                     }),
    //                     method: 'POST'
    //                 }
    //             );
    //             const json = await response.json();
    //             setRoomChat(json.data);
    //             setLastChat('');
    //         } catch (err) {
    //             console.log({ err });
    //         }
    //     },
    //     [setRoomChat, roomUrlId],
    // );


    return (
        <ChatContext.Provider value={{ sendChat, roomChat }}>
            {children}
        </ChatContext.Provider>
    );
}
