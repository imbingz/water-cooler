import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSocket } from './SocketProvider';

const ChatContext = createContext();

export function useChat() {
    return useContext(ChatContext);
}

export function ChatProvider({ id, children }) {
    const [chats, setChats] = useState('chats', []);
    const [selectedChatIndex, setSelectedChatIndex] = useState(0);
    const socket = useSocket();

    function createConversation(recipients) {
        setChats(prevChats => {
            return [...prevChats, { recipients, messages: [] }];
        });
    }

    const addMessageToChat = useCallback(({ recipients, text, sender }) => {
        setChats(prevChats => {
            let madeChange = false;
            const newMessage = { sender, text };
            const newChats = prevChats.map(chat => {
                if (arrayEquality(chat.recipients, recipients)) {
                    madeChange = true;
                    return {
                        ...chat,
                        messages: [...chat.messages, newMessage]
                    };
                }
                return chat;
            });

            if (madeChange) {
                return newChats;
            }
            return [
                ...prevChats,
                { recipients, messages: [newMessage] }
            ];
        });
    }, [setChats]);

    useEffect(() => {
        if (socket == null) return;

        socket.on('receive-message', addMessageToChat);

        return () => socket.off('receive-message');
    }, [socket, addMessageToChat]);

    function sendMessage(recipients, text) {
        socket.emit('send-message', { recipients, text });

        addMessageToChat({ recipients, text, sender: id });
    }

    // const formattedChats = chats.map((chat, index) => {
    //     const recipients = chat.recipients.map(recipient => {
    //         const contact = contacts.find(contact => {
    //             return contact.id === recipient
    //         })
    //         const name = (contact && contact.name) || recipient
    //         return { id: recipient, name }
    //     })

    //     const messages = chat.messages.map(message => {
    //         const contact = contacts.find(contact => {
    //             return contact.id === message.sender
    //         })
    //         const name = (contact && contact.name) || message.sender
    //         const fromMe = id === message.sender
    //         return { ...message, senderName: name, fromMe }
    //     })

    //     const selected = index === selectedChatIndex
    //     return { ...chat, messages, recipients, selected }
    // })

    const value = {
        chats: chats,
        selectedConversation: chats[selectedChatIndex],
        sendMessage,
        selectConversationIndex: setSelectedChatIndex,
        createConversation
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

function arrayEquality(a, b) {
    if (a.length !== b.length) return false;

    a.sort();
    b.sort();

    return a.every((element, index) => {
        return element === b[index];
    });
}