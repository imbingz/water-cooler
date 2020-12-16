import React, { useState } from 'react';
import { useGlobalContext } from '../utils/GlobalContext';

const Rooms = () => {
  const [, dispatch] = useGlobalContext;
  const [roomName, setRoomName] = useState('')

  const createRoom = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        '/api/room/create',
        {
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: roomName
          }),
          method: 'POST'
        }
      );
      const json = await response.json();

      dispatch({ type: 'createRoom', payload: json.data });
      setRoomName('');
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <>
      <h1>Create a Room</h1>
      <form onSubmit={createRoom}t>
        <input
          required
          type="text"
          name="room-name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button>Create Room</button>
      </form>
    </>
  );
};

export default Rooms;