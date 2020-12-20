import React, { useState } from 'react';
import { useGlobalContext } from '../utils/GlobalContext';

const socketClient = require('socket.io-client');
const socket = socketClient('http://localhost:8080');

const Homepage = () => {
    const [state, dispatch] = useGlobalContext();
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

    const receiveMessage = async (messageRecieved) => {
        try {
            dispatch({ type: 'getMessage', payload: messageRecieved });
            console.log(state.messages);
        } catch (err) {
            console.log(err);
        }
    };

    
    socket.on('chat-message', (receivedMessage) => {
        receiveMessage(receivedMessage);
    });

    return (
        <>
            {/* <div>
                {state.messages.map(message => (
                    <p>{message}</p>
                ))}
            </div> */}
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
                    onClick = {sendMessage}
                >
                    Send
                </button>
            </form>
        </>
    );
};

export default Homepage;