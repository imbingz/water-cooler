import React, { useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../../utils/GlobalContext';
import './LoginModal.css';


function LoginModal(props) {
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    // const {onHide} = props;

    //Global USER object
    const [ , dispatch] = useGlobalContext();

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
                // notify user if email or password not match
                toast.error('Password or Email does not match', {
                    position: toast.POSITION.TOP_CENTER
                });
               
                emailRef.current.value = '';
                passwordRef.current.value = '';
                emailRef.current.focus();
                return;
            }

            localStorage.setItem('USER', JSON.stringify(data.user));

            const storedUser = JSON.parse(localStorage.getItem('USER'));

            //If logged in user, set USER to the user object
            if(storedUser) {
                dispatch({ type: 'setUser', payload: storedUser });  
            } 

            //redirect to authenticated homepage
            history.push('/');

        } catch (err) {
            console.error(err);
            //Notify user on error 
            toast.error('Something went wrong, please try again later ...', {
                position: toast.POSITION.TOP_CENTER
            });
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
