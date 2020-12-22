import React, { useState } from 'react';
import { useGlobalContext } from '../../utils/GlobalContext';
import io from 'socket.io-client';
let socket;

const Chat = () => {
    const [, dispatch] = useGlobalContext();
    const [messageInput, setMessageValue] = useState('');
    const roomPageUrl = document.URL;
    const name = 'Name' + Math.random(100).toFixed(2);
    let roomUrlId = roomPageUrl.substring((roomPageUrl.length) - 36);

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            receiveMessage('You: ' + messageInput);
            let chatDetails = {
                messageInput: messageInput,
                roomUrlId: roomUrlId,
                name: name
            };
            dispatch({ type: 'getMessage', chatDetails });
            socket.emit('send-chat-message', roomUrlId, name, messageInput);
            setMessageValue('');
        } catch (err) {
            console.log(err);
        }
    };

    const receiveMessage = async (message) => {
        try {
            const messageContainer = document.getElementById('messageContainer');
            const messageElement = document.createElement('p');
            messageElement.innerText = message;
            messageContainer.append(messageElement);
            
        } catch (err) {
            console.log(err);
        }
    };    
    

    if (!socket) {
        socket = io('http://localhost:8080', {
            transports: ['websocket']
        }); //this is the  client connection. it starts when client connects

        socket.on('connect', () => {
            receiveMessage('You connected');
            socket.emit('new-user', roomUrlId, name);
        });

        socket.on('connect_error', err => {
            console.log(err);
        });

        socket.on('user-connected', (roomUrlId, name) => {
            receiveMessage(name + 'has joined the chat');
        });

        socket.on('receive-sent-message', (roomUrlId, name, messageInput) => {
            receiveMessage(name + ': ' + messageInput);
        });

    }

    return (
        <>
            <div id='messageContainer'></div>
            <form>
                <input
                    required
                    type='text'
                    name='messageInput'
                    value={messageInput}
                    onChange={(e) => setMessageValue(e.target.value)}
                />
                <button
                    type='submit'
                    id='send-button'
                    onClick={sendMessage}
                >
                    Send
                </button>
            </form>
        </>
    );
};

export default Chat;