import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../../utils/GlobalContext';
import './LoginModal.css';


function LoginModal(props) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    //Global USER object
    const [ , dispatch] = useGlobalContext();

    const handleLogin = async e => {
        e.preventDefault();

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
            toast.error('Password or Email does not match', {
                position: toast.POSITION.TOP_CENTER
            });

            setEmail('');
            setPassword('');
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
                            <input required type='email' id='email' name='email' value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className='d-inline-block ml-5 text-center'/>
                        </div>
                        <div className='LoginModal-form-group'>
                            <label htmlFor='password' className='d-inline-block'><strong>Password:</strong> </label>
                            <input required type='password' id='password' name='password' value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className='d-inline-block ml-4 text-center'/>
                        </div>

                        <button
                            className='LoginModal-btn d-inline-block mt-3 px-4 py-1'
                            type='submit'
                        >
                        Login
                        </button>
                    </form>
                </Modal.Body>
                <Modal.Footer className='LoginModal-footer'> </Modal.Footer>        
            </Modal>
        </>
    );
}

export default LoginModal;
