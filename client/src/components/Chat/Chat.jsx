import React, { useState } from 'react';
import { useChat } from '../../utils/ChatProvider';

const Chat = () => {
    
    const [messageInput, setMessageValue] = useState('');
    // const roomPageUrl = document.URL;
    // let roomUrlId = roomPageUrl.substring((roomPageUrl.length) - 36);
    // const name = 'Name' + Math.random(100).toFixed(2);
    const { sendChat } = useChat();

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            receiveMessage('You: ' + messageInput);
            console.log('got to from chat function');
            sendChat(messageInput);
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

    // if (!socket) {

    //     socket.on('connect', () => {
    //         socket.emit('new-user', roomUrlId, name);
    //     });

    //     socket.on('connect_error', err => {
    //         console.log(err);
    //     });

    //     socket.on('user-connected', (roomUrlId, name) => {
    //         receiveMessage(name + ' has joined the chat');
    //     });

    //     socket.on('receive-sent-message', (roomUrlId, name, messageInput) => {
    //         receiveMessage(name + ': ' + messageInput);
    //     });
    // }

    // socket.emit('check-room', roomUrlId, name);

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
