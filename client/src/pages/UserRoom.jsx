import React, { useEffect } from 'react';
import { useGlobalContext } from '../utils/GlobalContext';

const UserRoom = () => {
    const [state, dispatch] = useGlobalContext();

    useEffect(() => {
        async function populateRoom() {
            const pageURL = document.URL;
            let urlID = pageURL.substring((pageURL.length) - 36);
            try {
                const response = await fetch(
                    '/api/room/:id',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            publicID: urlID
                        }),
                        method: 'POST'
                    }
                );
                const json = await response.json();
                dispatch({ type: 'popRoom', payload: json.data });
            } catch (err) {
                console.log({ err });
            }
        }
        populateRoom();
    }, [dispatch]);

    return (
        <>
            <h1>This is the UserRoom page</h1>
            <div>
                <h3>Room Info</h3>

                <ul id={state.currentRoom._id} key={state.currentRoom._id}>
                    <li>
                        {state.currentRoom.name}
                    </li>
                    <li>
                        {state.currentRoom._id}
                    </li>
                    <li>
                        {state.currentRoom.publicID}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default UserRoom;