import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../../utils/GlobalContext.js';
import { Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import dummyFriendRooms from '../../../data/friends';

// * CreateRoom Takes User Input To Create a Room. Prop Data is Used To Render The User's Friends
function CreateRoom(props) {
    
    const [{roomStyle}, dispatch] = useGlobalContext();
    const [roomFriends, setRoomFriends] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');

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
    }, [dispatch, roomFriends]);
    
    const createRoom = async (e) => {
        e.preventDefault();
        const { v4: uuidv4 } = require('uuid');
        const roomUrlId = uuidv4();
        const userId = JSON.parse(localStorage.getItem('USER'))._id;


        if (!roomName || !roomDescription || !roomStyle) {
            toast.warning('Please select a Room style and fill all fields!', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }

        try {
            const response = await fetch(
                '/api/room/create',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        roomName: roomName,
                        roomDescription: roomDescription,
                        publicRoomId: roomUrlId,
                        userId: userId,
                        roomFriends: roomFriends,
                        roomImg: roomStyle
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

    const addFriendToRoom = (friendId) => {
        let friendArray = [];
        friendArray.push(...roomFriends, friendId);
        setRoomFriends(friendArray);
    };

    // * Render Dummy Or DB Data
    // ** A Yes Value will Render The DOM with Data From Data Folder, Changing this to 'no' Will Render DOM with DB Data
    let dummyData = 'no';
    let renderFriends;
    
    switch(dummyData) {
        case 'yes': 
            renderFriends = dummyFriendRooms;        
            break;
        default: 
            renderFriends = props.allFriends;
    }

    return (
        <Col xs={12} lg={7} md={6} className='pl-2 pb-3'>
            <form>
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
                            value={roomDescription}
                            onChange={(e) => setRoomDescription(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='font-weight-bold pt-3' >Invite Friends</p>
                        <div className='d-flex flex-row flex-nowrap align-items-center overflow-auto'>
                            { renderFriends && 
                                renderFriends.map(friend => (
                                    <div
                                        key={friend.friendId}
                                        id={friend.friendId}
                                        className='d-flex flex-column align-items-center mr-1'
                                        onClick={(e) => addFriendToRoom(e.currentTarget.id)}
                                    >
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
                            onClick={ createRoom }
                        >Create Room</Button>
                    </Col>
                </Row>
            </form>
        </Col>
    );
}

export default CreateRoom;