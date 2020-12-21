import React, { useState } from 'react';
// import { useGlobalContext } from '../utils/GlobalContext';
import io from 'socket.io-client';
let socket;

const Homepage = () => {
    // const [state, dispatch] = useGlobalContext();
    const [messageInput, setMessageValue] = useState('');

    if (!socket) {
        socket = io('http://localhost:8080', {
            transports: ['websocket']
        }); //this is the  client connection. it starts when client connects

        socket.on('connect', () => {
            console.log('Socket Connected');
        });

        socket.on('connect_error', err => {
            console.log(err);
        });

        socket.on('chat-message', message => {
            receiveMessage(message);
        });

    }

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