import React, { useState } from 'react';
// import { useGlobalContext } from '../utils/GlobalContext';

const socketClient = require('socket.io-client');
const socket = socketClient('http://localhost:8080');

const Homepage = () => {
    // const [state, dispatch] = useGlobalContext();
    const [messageInput, setMessageValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            socket.emit('send-chat-message', messageInput);
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


    socket.on('chat-message', (receivedMessage) => {
        receiveMessage(receivedMessage);
    });

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

export default Homepage;