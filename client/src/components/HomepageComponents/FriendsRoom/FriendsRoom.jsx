import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import { IoIosPeople } from 'react-icons/io';
import dummyFriendRooms from '../../../data/friendsRoom';

// * FriendsRoom Will Render Any Currently Open Rooms Hosted By a User's Friend Using prop Data From Homepage
function FriendsRoom(props) {

    // * Render Dummy Or DB Data
    // ** A Yes Value will Render The DOM with Data From Data Folder, Changing this to 'no' Will Render DOM with DB Data
    let dummyData = 'no';
    let renderRooms;
    
    switch(dummyData) {
        case 'yes': 
            renderRooms = dummyFriendRooms;        
            break;
        default: 
            renderRooms = props.roomsData;
    }
   
    return (

        <IconContext.Provider value={{ color: '#84f', size: 20 }}>
            <Row className='d-flex justify-content-center align-items-center mt-3'> 
                {renderRooms.length ? <h5 >Join A Friend's Room</h5> : <h5> No Friend's Room To Join</h5> }
            </Row>

            <Row className='d-flex flex-wrap justify-content-around align-items-sm-center'>
                
                {renderRooms.map(room => (
                    <div className="my-3" key={room._id}>
                        <Col className='mb-4'>
                            <Card style={{ width: '325px' }} className='p-4'>
                                <Card.Img variant="top" src={room.roomImg} style={{width: 288, height: 185}}/>
                                <Card.Body>
                                    <Card.Title>{room.roomName}</Card.Title>
                                    <Card.Text>
                                        {room.roomDesc}
                                    </Card.Text>
                                    <div className='d-flex flex-column justify-content-start'> 
                                        <div className='d-flex flex-row justify-content-between'>
                                            <div>
                                                <i><CgProfile /> </i>
                                                <span>{room.roomCreator} </span>
                                            </div>
                                        </div>
                                        <div className='d-flex flex-row justify-content-between'>
                                            <div>
                                                <i><IoIosPeople /> </i>
                                                <span> {room.roomUsers.length} Cool Persons</span>
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
