import React, { useRef, useState } from 'react';
import {Modal, Container, Row} from 'react-bootstrap';
import LoginModal from '../LoginModal';
import './SignupModal.css';
import images from '../../data/profileImages';

function SignupModal(props) {
  
    const [selectedImg, setSelectedImg] = useState('https://cdn130.picsart.com/246483773027202.jpg?type=webp&to=crop&r=256');

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPassRef = useRef();

    //Nested Login Modal 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSignup = async e => {
        e.preventDefault();

        const firstName = firstNameRef.current.value;
        const username = lastNameRef.current.value;
        const lastName = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPass = confirmPassRef.current.value;

        try {
            if (password !== confirmPass) {
                //  ** need to figure out a better way than alert here ** //
                alert('Passwords do not match');
                return;
            } 
            const response = await fetch('/api/user/signup', {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    username,
                    password,
                    email,
                    imageSrc: selectedImg
                }),
                method: 'POST'
            });
            const json = await response.json();

            console.log(json);
            //**** Note: we may want to do some notification to user here instead of log error  *****//
            if (json && json.data && json.data.error) {
                console.log(json.data.error.message);
            } else {
                firstNameRef.current.value='';
                lastNameRef.current.value='';
                usernameRef.current.value='';
                emailRef.current.value='';
                passwordRef.current.value='';
                confirmPassRef.current.value='';
                // open login modal
                handleShow();
            }
       
            
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Modal
                {...props}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container style={{backgroundColor: '#dedede'}} className='py-5'>
                        <form className='Signup-form' onSubmit={handleSignup}>
                            <Row className='SignupModal-row'>
                                <div className='SignupModal-form-group'>
                                    <label htmlFor='firstName'>First Name: </label>
                                    <input required id='firstName' name='firstName' type='text' ref={firstNameRef} />
                                </div >
                                <div className='SignupModal-form-group'>
                                    <label htmlFor='lastName'>Last Name: </label>
                                    <input required id='lastName' name='lastName' type='text' ref={lastNameRef} />
                                </div>
                            </Row >
                            <Row className='SignupModal-row'>
                                <div className='SignupModal-form-group'>
                                    <label htmlFor='username'>Username: </label>
                                    <input required id='username' name='username' type='text' ref={usernameRef} />
                                </div>
                                <div className='SignupModal-form-group'>
                                    <label htmlFor='email'>Email: </label>
                                    <input required type='email' id='email' name='email' ref={emailRef} />
                                </div>
                            </Row>
                            <Row className='SignupModal-row'>
                                <div className='SignupModal-form-group'>
                                    <label htmlFor='password'>Password: </label>
                                    <input required type='password' id='password' name='password' ref={passwordRef} />
                                </div>
                                <div className='SignupModal-form-group'>
                                    <label htmlFor='confirmPass'>Confirm Password: </label>
                                    <input required type='password' id='confirmPass' name='confirmPass' ref={confirmPassRef} />
                                </div>
                            </Row>
                            <Row className='d-flex flex-row justify-content-center mt-5'>  
                                <div>
                                    <img 
                                        className='SignupModal-image-selected'
                                        src={selectedImg} 
                                        alt='profile'
                                    />
                                </div>
                            </Row>
                            <Row className='d-flex flex-column justify-content-center align-items-center mt-4'>
                                <h6 className='text-muted'>Choose Your Avatar</h6>
                                <div className='d-flex flex-wrap justify-content-center mt-1 px-5'>
                                    {images.map(image => (
                                        <img key={image.id}
                                            src={image.imageSrc} alt='default' className='SignupModal-image d-inline-block mr-2 mb-3'
                                            onClick={()=>{setSelectedImg(image.imageSrc); console.log(image.imageSrc);}}
                                        />
                                    ))}
                                </div>
                            </Row>
                            <Row className='mr-1 mt-3 d-flex justify-content-center'>
                                <button
                                    className='SignupModal-btn'
                                    type='submit'
                                >
                             Signup
                                </button>
                            </Row>
                        </form>
                        {/* <p className='text-center mt-5 mb-0 text-muted'>
				                Already have an account?
                            <button 
                                className='SignupModal-login-btn'
                                noClick={handleShow}
                            >
                                <u>Login Here</u>
                            </button> 
                        </p> */}
                   
                    </Container>
                </Modal.Body>
                <Modal.Footer className='SearchModal-footer'>
                    
                </Modal.Footer>
               
            </Modal>

            <LoginModal show={show} onHide={() => handleClose (false)} />     
        </>
    );
}

export default SignupModal;
