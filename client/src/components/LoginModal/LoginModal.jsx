import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import './LoginModal.css';


function LoginModal(props) {
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    // const {onHide} = props;

    const handleLogin = async e => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const response = await fetch('/api/user/login', {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                }),
                method: 'POST'
            });

            const data = await response.json();

            if (data.error) {
                console.log(data.error);
                // *** NEED TO GET A BETTER WAY THAN ALERT TO NOTIFY USER **** //
                alert('Password and Email do not match');
                emailRef.current.value = '';
                passwordRef.current.value = '';
                emailRef.current.focus();
                return;
            }
            // change to global context
            //  // have db return userID, username, imageSrc, names, blocked array
            //  // sessionID once authenticated
            localStorage.setItem('USER', JSON.stringify(data.user));

            // **** needs to re-direct to authenticated-home page through global context
            history.push('/room');
        } catch (err) {
            console.error(err);
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

                    <form className='LoginModal-form' onSubmit={handleLogin}>
                        <div className='LoginModal-form-group'>
                            <label htmlFor='email' className='d-inline-block'><strong>Email:</strong> </label>
                            <input required type='email' id='email' name='email' ref={emailRef} className='d-inline-block ml-5 text-center'/>
                        </div>
                        <div className='LoginModal-form-group'>
                            <label htmlFor='password' className='d-inline-block'><strong>Password:</strong> </label>
                            <input required type='password' id='password' name='password' ref={passwordRef} className='d-inline-block ml-4 text-center'/>
                        </div>

                        <button
                            className='LoginModal-btn d-inline-block mt-3 px-4 py-1'
                            type='submit'
                        // onClick={onHide}
                        >
                        Login
                        </button>
        
                        {/* <p className='pt-3 mb-0'>
				        Don't have an account?
                            <button className='LoginModal-signup-btn'> <u>SignUp Here</u> </button>
                        </p>                 */}
                    </form>
                </Modal.Body>
                <Modal.Footer className='LoginModal-footer'> </Modal.Footer>        
            </Modal>
        </>
    );
}

export default LoginModal;
