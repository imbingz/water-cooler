import React from 'react';
import { Modal, Container, Row, Button, Col } from 'react-bootstrap';
import {HiOutlineMail} from 'react-icons/hi';
function ProfileModal(props) {
    const {friend, onHide} = props;
    return (
    // <Modal {...props} aria-labelledby="contained-modal-title" backdrop="static" keyboard={false} centered>

    //     <Modal.Header closeButton>
    //         <Modal.Title id="contained-modal-title" className='d-none'>{friend.username} Profile</Modal.Title>
    //     </Modal.Header>

    //     <Modal.Body>
                
    //         <Container className='d-flex flex-column justify-content-center align-items-center mx-auto' style={{backgroundColor: '#ddc9fc', width: 325, height: 500 }}>
    //             <Row>
    //                 <div className='mb-4' >
    //                     <img src={friend.imageSrc} alt={friend.username} style={{width: 75, height: 75, borderRadius:50}}/>
    //                 </div>
    //             </Row>

    //             <Row>
    //                 <h6 className='pt-1 mx-1'> {friend.firstName} </h6>      
    //                 <h6 className='pt-1 mx-1'>  {friend.lastName} </h6> 
    //             </Row>
    //             <Row>
    //                 <p className='mb-0 Profile-Modal-username' style={{fontSize: '1rem', color: '#333'}}> {friend.username} </p> 
    //             </Row>
    //             <Row className='mb-3'>
    //                 <i className='mx-1'><HiOutlineMail size={22} style={ { fill: 'darkgrey' } }/></i>
    //                 <a href = {`mailto: ${friend.email}`} style={{fontSize: '1rem', color: '#333'}}>{friend.email}</a>  
    //             </Row>
    //             <Row className='my-4'>
    //                 <Button onClick={onHide} className='d-inline-block mx-2 px-3' variant='danger' size='sm'>Block</Button >
    //                 <Button onClick={onHide} className='d-inline-block mx-2 px-3' sizee='sm' variant='success'>Invite</Button >
    //             </Row>
    //         </Container>           
    //     </Modal.Body>
    // </Modal>

        <Modal {...props} aria-labelledby="contained-modal-title" backdrop="static" keyboard={false} centered>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title" className='d-none'>{friend.username} Profile</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                
                <section className='d-flex flex-column justify-content-center align-items-center mx-auto' style={{backgroundColor: '#ddc9fc'}}>
                    <Row className='mt-5'>
                      
                        <div className='mt-1'>
                            <img src={friend.imageSrc} alt={friend.username} style={{width: 75, height: 75, borderRadius:50}}/>
                        </div>
                     
                        <Col className='ml-2'>
                            <div className='d-flex flex-row justify-content-start'>
                                <h6 className='pt-1'> {friend.firstName} </h6>      
                                <h6 className='pt-1 mx-2'>  {friend.lastName} </h6> 
                            </div>
                            <p className='mb-0 Profile-Modal-username' style={{fontSize: '1rem', color: '#333'}}> {friend.username} </p>
                            <div>
                                <i className='mr-2'><HiOutlineMail size={22} style={ { fill: 'black' } }/></i>
                                <a href = {`mailto: ${friend.email}`} style={{fontSize: '1rem', color: '#333'}}>{friend.email}</a> 
                            </div>
                            
                            <Row>
                                
                            </Row>
                            <Row className='mb-3'>
                                
                            </Row>    
                        </Col>
                    </Row>            
                    <Row className='my-4'>
                        <Button onClick={onHide} className='d-inline-block mx-2 px-3' variant='danger' size='sm'>Block</Button >
                        <Button onClick={onHide} className='d-inline-block mx-2 px-3' sizee='sm' variant='success'>Invite</Button >
                    </Row>
                </section>           
            </Modal.Body>
        </Modal>
    );
}

export default ProfileModal;
