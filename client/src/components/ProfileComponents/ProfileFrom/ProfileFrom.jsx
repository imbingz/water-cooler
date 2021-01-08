import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './ProfileFrom.css';

const ProfileFrom = (props) => {

    const history = useHistory();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();

    //pre-fill the user info
    useEffect(() => {
        // need to change here to global context stored from Login
        if (!props.storedUser) {
            return history.push('/login');
        }

        firstNameRef.current.value = props.storedUser.firstName || '';
        lastNameRef.current.value = props.storedUser.lastName || '';
        usernameRef.current.value = props.storedUser.username || '';
        emailRef.current.value = props.storedUser.email || '';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateProfile = async e => {
        e.preventDefault();

        const user = {
            _id: props.storedUser._id,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            username: usernameRef.current.value,
            email: emailRef.current.value
        };

        try {
            const response = await fetch('/api/user/profile', {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user
                }),
                method: 'PUT'
            });

            const data = await response.json();
            if (data.user) {
                console.log(data.user);
                // *** NEED A BETTER WAY TO REPLACE ALERT  *** //
                alert('Your profile is updated successfully');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className='Profile-user'>
            <form className='Profile-form' onSubmit={updateProfile}>
                <div className='Profile-img-group'>
                    <img className='Profile-image' src='https://styles.redditmedia.com/t5_2tmtib/styles/profileIcon_pcmjnyopxm851.png?width=256&height=256&crop=256:256,smart&frame=1&s=868d500bf8180ecdc516e2a8fab4f66536a894b0' alt='avarta' />
                    <button className='Profile-img-edit-btn' onClick={(e) => { e.preventDefault(); console.log('upload photo'); }}>Edit Photo</button >
                    {/* <input
                            type='file'
                            onChange={() => {
                                console.log('upload image later');
                            }}
                        />
                        <button
                            className='Profile-image-btn'
                            onClick={() => {
                                console.log('upload avarta later');
                            }}>
                            Upload
                        </button> */}
                </div>
                <div className='Profile-input-group'>
                    <div className='Profile-form-group'>
                        <label htmlFor='firstName'>First Name: </label>
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            ref={firstNameRef}
                        />
                    </div>
                    <div className='Profile-form-group'>
                        <label htmlFor='lastName'>Last Name: </label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            ref={lastNameRef}

                        />
                    </div>
                    <div className='Profile-form-group'>
                        <label htmlFor='username'>Username: </label>
                        <input
                            required
                            id='username'
                            name='username'
                            type='text'
                            ref={usernameRef}
                        />
                    </div>
                    <div className='Profile-form-group'>
                        <label htmlFor='email'>Email: </label>
                        <input
                            required
                            type='email'
                            id='email'
                            name='email'
                            ref={emailRef}
                        />
                    </div>
                    <button className='Profile-update-btn' type='submit'>
                        Update Now
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ProfileFrom;