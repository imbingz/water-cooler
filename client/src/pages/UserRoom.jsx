import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../utils/GlobalContext';

const UserRoom = () => {
    const [state, dispatch] = useGlobalContext();
    const [inputSocialSpaceName, setSocialSpaceName] = useState('');

    const history = useHistory();

    const roomPageUrl = document.URL;
    let roomUrlId = roomPageUrl.substring((roomPageUrl.length) - 36);

    // const messageContainer = document.getElementById('message-container')
    // const messageForm = document.getElementById('send-container')
    // const messageInput = document.getElementById('message-input')

    
    useEffect(() => {
        async function fetchSocialSpaces() {
            try {
                const response = await fetch(
                    '/api/socialspace',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            publicRoomId: roomUrlId
                        }),
                        method: 'POST'
                    }
                );
                const json = await response.json();
                dispatch({ type: 'getAll', payload: json.data });
            } catch (err) {
                console.log({ err });
            }
        }
        async function populateRoom() {
            try {
                const response = await fetch(
                    '/api/room/:id',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            publicRoomId: roomUrlId
                        }),
                        method: 'POST'
                    }
                );
                const json = await response.json();
                dispatch({ type: 'popOne', payload: json.data });
            } catch (err) {
                console.log({ err });
            }
        }
        fetchSocialSpaces();
        populateRoom();
    }, [dispatch, roomUrlId]);

    
    const createSocialSpace = async (e) => {
        e.preventDefault();
        const {v4: uuidv4 } = require('uuid');
        const socialSpaceUrlId = uuidv4();
        try {
            const response = await fetch(
                '/api/socialspace/create',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        publicRoomId: roomUrlId,
                        publicSocialSpaceId: socialSpaceUrlId,
                        socialSpaceName: inputSocialSpaceName,
                    }),
                    method: 'POST'
                }
            );
            const json = await response.json();
            dispatch({ type: 'createSocialSpace', payload: json.data });
            setSocialSpaceName('');
            history.push('/rooms/' + roomUrlId + '/' + socialSpaceUrlId);
        } catch (err) {
            console.log(err);
        }
    };

    const routeToSocialSpace = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                '/api/socialspace/find',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: document.activeElement.parentElement.id
                    }),
                    method: 'POST'
                }
            );
            const json = await response.json();
            const roomUrlId = json.data.publicRoomId;
            const socialSpaceUrlId = json.data.publicSocialSpaceId;
            history.push('/rooms/' + roomUrlId + '/' + socialSpaceUrlId);
        } catch (err) {
            console.log({ err });
        }
    };

    // const sendChat = async (e) => {
    //     e.preventDefault();
    //     const message = messageInput.value;
        
    // }

    return (
        <>
            <h1>This is the UserRoom page</h1>
            <div>
                <h3>Room Info</h3>

                <ul id={state.currentRoom._id} key={state.currentRoom._id}>
                    <li>
                        Room Name: {state.currentRoom.roomName}
                    </li>
                    <li>
                        Room ID: {state.currentRoom._id}
                    </li>
                    <li>
                        Room Public ID: {state.currentRoom.publicRoomId}
                    </li>
                </ul>
            </div>
            <div>
                <h3>Create a Social Space</h3>
                <form onSubmit={createSocialSpace}>
                    <input
                        required
                        type='text'
                        name='inputSocialSpaceName'
                        value={inputSocialSpaceName}
                        onChange={(e) => setSocialSpaceName(e.target.value)}
                    />
                    <button>Create Social Space</button>
                </form>
            </div>
            <div>
                <h3>Open Social Spaces</h3>
                <ul>
                    {state.socialSpaces.map(socialSpace => (
                        <li id={socialSpace._id} key={socialSpace._id}>
                            <button onClick={routeToSocialSpace}>
                                {socialSpace.socialSpaceName}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    );
};

export default UserRoom;