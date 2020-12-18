import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Signup = props => {
    const history = useHistory();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPassRef = useRef();

    const handleSignup = async e => {
        e.preventDefault();

        const username = usernameRef.current.value;
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
                    username,
                    password,
                    email
                }),
                method: 'POST'
            });
            const json = await response.json();

            //**** Note: we may want to do some notification to user here instead of log error  *****//
            if (json && json.data && json.data.error) {console.log(json.data.error.message);}

            history.push('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main>
            <form className='Signup-form' onSubmit={handleSignup}>
                <div className='Signup-form-group'>
                    <label htmlFor='username'>Username: </label>
                    <input required id='username' name='username' type='text' ref={usernameRef} />
                </div>
                <div className='Signup-form-group'>
                    <label htmlFor='email'>Emai: </label>
                    <input required type='email' id='email' name='email' ref={emailRef} />
                </div>
                <div className='Signup-form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input required type='password' id='password' name='password' ref={passwordRef} />
                </div>
                <div className='Signup-form-group'>
                    <label htmlFor='confirmPass'>Confirm Password: </label>
                    <input required type='password' id='confirmPass' name='confirmPass' ref={confirmPassRef} />
                </div>
                <button type='submit'>Sign Up</button>
            </form>
            <p>
				Already have an account?
                <Link to='/login'> Login Here </Link>
            </p>
        </main>
    );
};

export default Signup;
