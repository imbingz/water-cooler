import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../../utils/GlobalContext.js';
import { Button, Col, Row } from 'react-bootstrap';
import friends from '../../../data/friends';
import { v4 as uuidv4 } from 'uuid';


function CreateRoom() {

    const [{ roomStyle },] = useGlobalContext();
    const [state, dispatch] = useGlobalContext();
    const [roomName, setRoomName] = useState('');

    const history = useHistory();

    useEffect(() => {
        async function fetchRooms() {
            try {
                const response = await fetch('/api/room');
                const json = await response.json();
                dispatch({ type: 'getAll', payload: json.data });
            } catch (err) {
                console.log({ err });
            }
        }
        fetchRooms();
    }, [dispatch]);
    
    const createRoom = async (e) => {
        e.preventDefault();
        const { v4: uuidv4 } = require('uuid');
        const roomUrlId = uuidv4();
        try {
            const response = await fetch(
                '/api/room/create',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        roomName: roomName,
                        publicRoomId: roomUrlId
                    }),
                    method: 'POST'
                }
            );
            const json = await response.json();
            dispatch({ type: 'createRoom', payload: json.data });
            setRoomName('');
            history.push('/rooms/' + roomUrlId);
        } catch (err) {
            console.log(err);
        }
    };

    const routeToRoom = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                '/api/room/find',
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
            history.push('/rooms/' + roomUrlId);
        } catch (err) {
            console.log({ err });
        }
    };

    return (
        <Col xs={12} lg={7} md={6} className='pl-2 pb-3'>
            <form 
                onSubmit={ createRoom }
            >
                <Row>
                    <Col xs={12} md={6} className='d-flex flex-column align-middle pt-2'>
                        <label htmlFor="roomName" className='font-weight-bold'>Room Name: </label>
                        <input
                            className='px-2'
                            required
                            id="roomName"
                            type='text'
                            name='roomName'
                            placeholder='Destiny 2 ...'
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                    </Col>
                    <Col xs={12} md={6} className='d-flex flex-column align-middle pt-2'>
                        <label htmlFor="inputRoomDescription" className='font-weight-bold'>Room Description: </label>
                        <textarea className='px-2'
                            required
                            id='inputRoomDescription'
                            type='text'
                            name='inputRoomDescription'
                            placeholder='Everything Destiny ...'
                        // value={roomName}
                        // onChange={(e) => setRoomName(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='font-weight-bold pt-3' >Invite Friends</p>
                        <div className='d-flex flex-row flex-nowrap align-items-center overflow-auto'>
                            {
                                friends.map(friend => (
                                    <div key={uuidv4()} className='d-flex flex-column align-items-center mr-1'>
                                        <img src={friend.imageSrc} alt={friend.username} style={{ width: 48, height: 48, borderRadius: '50%' }} />
                                        <small>{friend.username.substr(0, 5)}</small>
                                    </div>
                                ))
                            }

                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col className='mt-3'>
                        <Button
                            className='border-0'
                            size='sm'
                            variant='danger'
                            onClick={() => {
                                console.log('btn roomStyle is:', roomStyle);

                                history.push('/room');
                            }}
                        >Create Room</Button>
                    </Col>
                </Row>
            </form>
        </Col>
    );
}

export default CreateRoom;

// return (
//     <>
//         <div>
//             <h1>Create a Room</h1>
//             <form onSubmit={createRoom}>
//                 <input
//                     required
//                     type='text'
//                     name='inputRoomName'
//                     value={inputRoomName}
//                     onChange={(e) => setRoomName(e.target.value)}
//                 />
//                 <button>Create Room</button>
//             </form>
//         </div>
//         <div>
//             <h3>Open Rooms</h3>
//             <ul>
//                 {state.rooms.map(room => (
//                     <li id={room._id} key={room._id}>
//                         <button onClick={routeToRoom}>
//                             {room.roomName}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     </>
// );