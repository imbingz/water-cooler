import React from 'react';
import {Row, Col,Button} from 'react-bootstrap';
import friends from '../../data/friends';
import {v4 as uuidv4} from 'uuid';


function CreateRoom() {
    return (
        <Col xs={12} lg={7} md={6} className='pl-2 pb-3'>
            <form onSubmit={ console.log('call createRoom func')}>
                <Row>
                    <Col xs={12} md={6} className='d-flex flex-column align-middle pt-2'>
                        <label htmlFor="inputRoomName" className='font-weight-bold'>Room Name: </label>     
                        <input
                            className='px-2'
                            required
                            id="inputRoomName"
                            type='text'
                            name='inputRoomName'
                            placeholder = 'Destiny 2 ...'
                        // value={inputRoomName}
                        // onChange={(e) => setRoomName(e.target.value)}
                        />
                    </Col>
                    <Col xs={12} md={6} className='d-flex flex-column align-middle pt-2'>
                        <label htmlFor="inputRoomDescription" className='font-weight-bold'>Room Description: </label>     
                        <textarea className='px-2'
                            required
                            id='inputRoomDescription'
                            type='text'
                            name='inputRoomDescription'
                            placeholder = 'Everything Destiny ...'
                        // value={inputRoomName}
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
                                        <img src={friend.imageSrc} alt={friend.username} style={{width: 48, height: 48, borderRadius: '50%'}}/>
                                        <small>{friend.username.substr(0, 5)}</small>
                                    </div>
                                ))
                            }

                        </div>     
                    </Col>
                </Row>
                <Row >
                    <Col className='mt-3'>
                        <Button className='border-0' size='sm' variant='danger'>Create Room</Button>
                    </Col>
                </Row>
            </form>
        </Col>
    );
}

export default CreateRoom;