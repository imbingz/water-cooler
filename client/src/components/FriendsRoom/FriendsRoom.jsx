import React from 'react';
import {Row, Col, Button, Card} from 'react-bootstrap';
import {MdAvTimer} from 'react-icons/md';
import {CgProfile} from 'react-icons/cg';
import {IoIosPeople} from 'react-icons/io';
import { IconContext } from 'react-icons';
import friendsRoom from '../../data/friendsRoom';


function FriendsRoom() {
    return (

        <IconContext.Provider value={{ color: '#84f', size: 20 }}>
            <Row className='d-flex justify-content-center align-items-center mt-3'> <h5 >Join A Friend's Room</h5> </Row>

            <Row className='d-flex flex-wrap justify-content-around align-items-sm-center'>
                
                {friendsRoom.map(room => (
                    <div className="my-3">
                        <Col className='mb-4'>
                            <Card style={{ width: '325px' }} className='p-4'>
                                <Card.Img variant="top" src={room.roomStyle} style={{width: 288, height: 185}}/>
                                <Card.Body>
                                    <Card.Title>{room.roomname}</Card.Title>
                                    <Card.Text>
                                        {room.roomDiscription}
                                    </Card.Text>
                                    <div className='d-flex flex-column justify-content-start'> 
                                        <div className='d-flex flex-row justify-content-between'>
                                            <div>
                                                <i><CgProfile /> </i>
                                                <span>{room.host} </span>
                                            </div>
                                            <div>
                                                <i><MdAvTimer /> </i>
                                                <span> {room.duration}</span>
                                            </div>
                                        </div>
                                        <div className='d-flex flex-row justify-content-between'>
                                            <div>
                                                <i><IoIosPeople /> </i>
                                                <span> {room.members} Cool Persons</span>
                                            </div>
                                            <div className='mt-4'>
                                                <Button 
                                                    size='sm' 
                                                    variant='warning' 
                                                    onClick={() => {console.log('handleJoinRoom');}}
                                                >
                                                    Join Room
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                            
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                ))}
            </Row>
        </IconContext.Provider>

    );
}

export default FriendsRoom;
