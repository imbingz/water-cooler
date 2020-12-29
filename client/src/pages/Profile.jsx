import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileInboundFriends from '../components/ProfileInboundFriends';
import ProfileUserFriends from '../components/ProfileUserFriends';

const Profile = props => {
    const history = useHistory();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();

    // use global context stored from Login
    const storedUser = JSON.parse(localStorage.getItem('USER'));

    //pre-fill the user info
    useEffect(() => {
        // need to change here to global context stored from Login
        if ( !storedUser) {
            return history.push('/login');  
        } 

        firstNameRef.current.value = storedUser.firstName || '';
        lastNameRef.current.value = storedUser.lastName || '';
        usernameRef.current.value = storedUser.username || '';
        emailRef.current.value = storedUser.email || '';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateProfile = async e => {
        e.preventDefault();

        const user = {
            _id: storedUser._id,
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
        <main>
            <section>
                <form className='Profile-form' onSubmit={updateProfile}>
                    <div className='Profile-form-group'>
                        <img className='Profile-image' src='assets/images/avarta.png' alt='avarta' />
                        <input
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
                        </button>
                    </div> 
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
                </form>
            </section>
            
            {/* delete id prop once added in those components */}
            {storedUser && <section>
                <ProfileInboundFriends id={ storedUser._id } />
                <ProfileUserFriends id={ storedUser._id } />
            </section> }
            
            
                
        </main>
    );
};

export default Profile;
